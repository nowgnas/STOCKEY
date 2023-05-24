package kr.stockey.stockservice.service;

import kr.stockey.stockservice.api.request.GetCorrelationRequest;
import kr.stockey.stockservice.api.request.GetLikeStockRankRequest;
import kr.stockey.stockservice.api.response.GetStockTodayResponse;
import kr.stockey.stockservice.client.FavoriteClient;
import kr.stockey.stockservice.client.IndustryClient;
import kr.stockey.stockservice.client.KeywordClient;
import kr.stockey.stockservice.dto.*;
import kr.stockey.stockservice.dto.core.*;
import kr.stockey.stockservice.entity.DailyStock;
import kr.stockey.stockservice.entity.Stock;
import kr.stockey.stockservice.exception.favorite.FavoriteException;
import kr.stockey.stockservice.exception.favorite.FavoriteExceptionType;
import kr.stockey.stockservice.exception.stock.DailyStockException;
import kr.stockey.stockservice.exception.stock.DailyStockExceptionType;
import kr.stockey.stockservice.exception.stock.StockException;
import kr.stockey.stockservice.exception.stock.StockExceptionType;
import kr.stockey.stockservice.mapper.BusinessMapper;
import kr.stockey.stockservice.mapper.StockDtoMapper;
import kr.stockey.stockservice.mapper.StockMapper;
import kr.stockey.stockservice.repository.DailyStockRepository;
import kr.stockey.stockservice.repository.StockRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.math3.stat.correlation.PearsonsCorrelation;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class StockServiceImpl implements StockService {


    private final StockRepository stockRepository;
    private final StockMapper stockMapper;
    private final StockDtoMapper stockDtoMapper;
    private final BusinessMapper businessMapper;
    private final DailyStockRepository dailyStockRepository;
    private final IndustryClient industryClient;
    private final KeywordClient keywordClient;
    private final FavoriteClient favoriteClient;

    public StockSummaryDto getStock(Long stockId) {
        Stock stock = stockRepository.findById(stockId).orElseThrow(() -> new StockException(StockExceptionType.NOT_FOUND));
        StockSummaryDto stockDto = stockMapper.toStockDto(stock);
        int industryTotalCount = stockRepository.findByIndustryId(stock.getIndustryId()).size();
        stockDto.setIndustryTotalCount(industryTotalCount);
        Long industryId = stock.getIndustryId();
        IndustryDto industryDto = getIndustry(industryId);
        List<BusinessDto> businessDtos = businessMapper.toDto(stock.getBusinesses());
        stockDto.setIndustry(industryDto);
        stockDto.setBusinesses(businessDtos);
        Integer marketCapRank = getStockIndustryMarketCapRank(stockId, industryId);
        stockDto.setIndustryCapRank(marketCapRank);
        Integer favoriteRank = getStockIndustryFavoriteRank(stockId, industryId);
        stockDto.setIndustryFavRank(favoriteRank);
        Float avgRate = getAverageIndustryChangeRate(industryId);
        stockDto.setIndustryAvgChangeRate(avgRate);
        DailyStockDto dailyStockDto = getTodayDailyStock(stockId);
        stockDto.setTodayDailyStock(dailyStockDto);
        return stockDto;
    }

    public Integer getStockIndustryMarketCapRank(Long stockId, Long industryId) {
        Integer rank = stockRepository.findIndustryMarketCapRank(stockId, industryId);
        return rank;
    }

    // 산업에서  해당 종목의 관심 순위
    public Integer getStockIndustryFavoriteRank(Long stockId, Long industryId) {
        // 종목리스트
        List<Stock> stockList = stockRepository.findByIndustryId(industryId);
        // 종목 id 리스트
        List<Long> stockIdList = stockList
                .stream()
                .map(o -> o.getId())
                .collect(Collectors.toList());
        GetLikeStockRankRequest request = new GetLikeStockRankRequest(stockIdList, stockId);
        return favoriteClient.getLikeStockRank(request);
    }

    public Float getAverageIndustryChangeRate(Long industryId) {
        Float avgChangeRate = stockRepository.findAverageIndustryChangeRate(industryId);
        return avgChangeRate;
    }

    public List<StockPreviewDto> getStock() {
        List<Stock> stocks = stockRepository.findAll();
        List<StockPreviewDto> stockPreviewDtos = new ArrayList<>();
        for (Stock s : stocks) {
            StockPreviewDto stockPreviewDto = stockMapper.toPreviewDto(s);
            DailyStockDto dailyStockDto = getTodayDailyStock(s.getId());
            stockPreviewDto.setTodayDailyStock(dailyStockDto);
            stockPreviewDtos.add(stockPreviewDto);
        }
        return stockPreviewDtos;
    }

    public List<StockPreviewDto> getStockRandom(Integer count) {
        List<Stock> stocks = stockRepository.findStockRandom(count);
        List<StockPreviewDto> stockPreviewDtos = new ArrayList<>();
        for (Stock s : stocks) {
            StockPreviewDto stockPreviewDto = stockMapper.toPreviewDto(s);
            DailyStockDto dailyStockDto = getTodayDailyStock(s.getId());
            stockPreviewDto.setTodayDailyStock(dailyStockDto);
            stockPreviewDtos.add(stockPreviewDto);
        }
        return stockPreviewDtos;
    }



    public List<DailyStockDto> getDailyStock(Long stockId) {
        List<DailyStock> dailyStock = dailyStockRepository.findByStockId(stockId);
        List<DailyStockDto> dailyStockDtos = stockMapper.toDailyStockDto(dailyStock);
        return dailyStockDtos;
    }

    public DailyStockDto getTodayDailyStock(Long stockId) {
        Stock stock = stockRepository.findById(stockId).orElseThrow(() -> new StockException(StockExceptionType.NOT_FOUND));
        DailyStock dailyStock = dailyStockRepository
                .findTodayDailyStock(stock.getId())
                .orElseThrow(() -> new DailyStockException(DailyStockExceptionType.NOT_FOUND));
        DailyStockDto dailyStockDto = stockMapper.toDailyStockDto(dailyStock);
        return dailyStockDto;
    }

    public List<StockSearchDto> getSearchStock(String keyword) {
        keyword = '%' + keyword + '%';
        List<Stock> stocks = stockRepository.findByName(keyword);
        List<StockSearchDto> stockSearchDtos = stockMapper.toSearchDto(stocks);
        return stockSearchDtos;
    }

    // 관심 종목 리스트 출력
    public List<GetStockTodayResponse> getMyStocks(MemberDto memberDto) {
        List<FavoriteDto> favorites = favoriteClient.getMyFavoriteStock(memberDto.getId());
        List<Stock> stockList = new ArrayList<>();


        List<StockTodayDto> result = new ArrayList<>();
        for (FavoriteDto favorite : favorites) {
            Long stockId = favorite.getStockId();
            DailyStock dailyStock = dailyStockRepository.findTodayDailyStock(stockId)
                    .orElseThrow(() -> new DailyStockException(DailyStockExceptionType.NOT_FOUND));

            Long stock_id = dailyStock.getStock().getId();
            String name = dailyStock.getStock().getName();
            Integer close_price = dailyStock.getClosePrice();
            Float change_rate = dailyStock.getChangeRate() * 100;

            StockTodayDto stockTodayDto = StockTodayDto.builder()
                    .id(stock_id)
                    .name(name)
                    .price(close_price)
                    .rate(change_rate)
                    .build();
            result.add(stockTodayDto);

        }
        return stockDtoMapper.toGetStockTodayResponse(result);
    }

    // 관심 여부 확인
    public boolean checkFavorite(Long userId, Long stockId) {
        return favoriteClient.checkFavoriteStock(userId,stockId);
    }

    // 관심 산업 등록
    @Transactional
    public void addFavorite(MemberDto memberDto, Long id) {
        getStockEntity(id);
        boolean isFavorite = checkFavorite(memberDto.getId(), id);
        //이미 관심등록했다면
        if (isFavorite) {
            throw new FavoriteException(FavoriteExceptionType.ALREADY_EXIST);
        }
        favoriteClient.createFavoriteStock(memberDto.getId(),id);
    }

    @Transactional
    public void deleteFavorite(MemberDto memberDto, Long id) {

        Stock stock = getStockEntity(id);
        boolean isFavorite = checkFavorite(memberDto.getId(), id);
        // 관심 등록하지 않았다면
        if (!isFavorite) {
            throw new FavoriteException(FavoriteExceptionType.NOT_FOUND);
        }
        favoriteClient.deleteFavoriteStock(memberDto.getId(),id);
    }

    public Double getCorrelation(Long id, GetCorrelationRequest getCorrelationRequest) {
        Stock stock = getStockEntity(id);
        Long keywordId = getCorrelationRequest.getKeywordId();

        LocalDate startDate = getCorrelationRequest.getStartDate();
        LocalDate endDate = getCorrelationRequest.getEndDate();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyMMdd");
        String startDateString = startDate.format(formatter);
        String endDateString = endDate.format(formatter);


        System.out.println("keywordId, startDateString,endDateString = " + keywordId+" "+ startDateString+" "+endDateString);
        List<KeywordCountDateDto> countDateList = keywordClient.getCountDate(keywordId, startDateString, endDateString);
        List<PriceDateDto> priceDateList = dailyStockRepository.getPriceDate(stock, startDate, endDate);

        List<Double> priceList = new ArrayList<>();
        List<Double> countList = new ArrayList<>();

        // HashMap 생성
        Map<LocalDate, KeywordCountDateDto> countDateDtoMap = countDateList.stream()
                .collect(Collectors.toMap(KeywordCountDateDto::getStatisticDate, Function.identity()));

        // 동일한 날짜일때 리스트에 추가
        priceDateList.stream()
                .filter(priceDate -> countDateDtoMap.containsKey(priceDate.getStockDate()))
                .forEach(priceDate -> {
                    KeywordCountDateDto countDateDto = countDateDtoMap.get(priceDate.getStockDate());
                    countList.add(Double.valueOf(countDateDto.getCount()));
                    priceList.add(Double.valueOf(priceDate.getClosePrice()));
                });
        return  getCorrelationResult(countList, priceList);
    }


    public List<ResultCorrelationDto> getAllStockCorrelation(Long id, GetCorrelationRequest getCorrelationRequest) {
        Stock stock = getStockEntity(id);
        Long industryId = stock.getIndustryId();
        List<StockCorrelationDto> stockList = new ArrayList<>();
        List<Stock> stocksExceptMe = stockRepository.getStocksExceptMe(stock, industryId);
        // 해당 종목을 제외한 주식들에 대하여 상관분석
        for (Stock s : stocksExceptMe) {
            Double correlation = getCorrelation(s.getId(), getCorrelationRequest);
            stockList.add(new StockCorrelationDto(s,correlation));
        }
        Collections.sort(stockList);


        List<ResultCorrelationDto> result = new ArrayList<>();
        //상위 3개
        for (int i = 0; i < 3; i++) {
            StockCorrelationDto stockCorrelationDto = stockList.get(i);
            ResultCorrelationDto resultCorrelationDto = ResultCorrelationDto.builder()
                    .id(stockCorrelationDto.getStock().getId())
                    .name(stockCorrelationDto.getStock().getName())
                    .correlation(stockCorrelationDto.getCorrelation())
                    .build();
            result.add(resultCorrelationDto);
        }
        System.out.println("result = " + result);
        return result;
    }

    // 상관관계 구하기
    private double getCorrelationResult(List<Double> avgKeywordCount, List<Double> stockweekStatistic) {
        PearsonsCorrelation correlation = new PearsonsCorrelation();
        double correlationCoefficient = correlation.correlation(
                avgKeywordCount.stream().mapToDouble(Double::doubleValue).toArray(),
                stockweekStatistic.stream().mapToDouble(Double::doubleValue).toArray()
        );
        return correlationCoefficient;
    }

    // 산업에 해당하는 종목들
    public List<StockDto> getByIndustryId(Long industryId) {
        List<Stock> stockList = stockRepository.findByIndustryId(industryId);
        return stockMapper.toStockDto(stockList);
    }

    //시가총액순 N개 출력
    public List<StockDto> getNStock(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        List<Stock> top5Stocks = stockRepository.findTop5Stocks(pageable);
        return stockMapper.toStockDto(top5Stocks);
    }

    //산업별 주식 시가총액순 N개 출력
    public List<StockDto> getNStock(Long industryId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        List<Stock> top5Stocks = stockRepository.findTop5Stocks(industryId, pageable);
        return stockMapper.toStockDto(top5Stocks);
    }

    // 산업별 날짜별 시가총액 합
    public List<IndustrySumDto> getMarketList(Long industryId) {
        List<IndustrySumDto> marketList = stockRepository.getMarketList(industryId);
        return marketList;
    }

    // 산업에 해당하는 종목들의 현재가
    public List<GetStockTodayResponse> findTodayDailyStock(Long industryId) {
        List<Stock> stockList = stockRepository.findByIndustryId(industryId);

        // 해당 주식의 현재가격 가져오기
        List<DailyStock> dailyStockList = stockList.stream()
                .map(o -> dailyStockRepository.findTodayDailyStock(o.getId()).get())
                .collect(Collectors.toList());
        //결과를 담을 result 리스트
        List<StockTodayDto> result = new ArrayList<>();
        for (DailyStock dailyStock : dailyStockList) {
            Long stock_id = dailyStock.getStock().getId();
            String name = dailyStock.getStock().getName();
            Integer close_price = dailyStock.getClosePrice();
            Float change_rate = dailyStock.getChangeRate() * 100;

            StockTodayDto stockTodayDto = StockTodayDto.builder()
                    .id(stock_id)
                    .name(name)
                    .price(close_price)
                    .rate(change_rate)
                    .build();
            result.add(stockTodayDto);
        }
        return stockDtoMapper.toGetStockTodayResponse(result);
    }


    // Stock Entity 반환
    private Stock getStockEntity(Long id) {
        return stockRepository.findById(id).orElseThrow(() -> new StockException(StockExceptionType.NOT_FOUND));
    }


    private IndustryDto getIndustry(Long industryId) {
        IndustryDto industryDto = industryClient.geIndustry(industryId);
        return industryDto;
    }
}
