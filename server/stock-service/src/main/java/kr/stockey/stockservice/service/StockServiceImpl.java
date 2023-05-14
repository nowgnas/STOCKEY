package kr.stockey.stockservice.service;

import kr.stockey.stockservice.api.request.CreateFavoriteStockRequest;
import kr.stockey.stockservice.api.request.GetCorrelationRequest;
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

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
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
        int industryTotalCount = stockRepository.findByIndustry(stock.getIndustryId()).size();
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

    public Integer getStockIndustryFavoriteRank(Long stockId, Long industryId) {
        Integer rank = stockRepository.findIndustryFavoriteRank(stockId, industryId);
        if (rank == null) {
            return 0;
        }
        return rank;
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


    public List<StockKeywordDto> getStockKeyword(Long stockId) {
        ResponseDto responseDto = keywordClient.findStockKeywords(stockId);
        List<StockKeywordDto> stockKeyword = (List<StockKeywordDto>) responseDto.getData();
        return stockKeyword;
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
    public List<GetStockTodayResponse> getMyStocks(MemberDto memberdto) {
        List<FavoriteDto> favorites= favoriteClient.getMyFavoriteStock();
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
        ResponseDto responseDto = favoriteClient.existsByMemberAndStock(userId, stockId);
        Boolean result = (Boolean) responseDto.getData();
        return result;
    }

    // 관심 산업 등록
    @Transactional
    public void addFavorite(MemberDto memberDto, Long id) {
        Stock stock = getStockEntity(id);
        boolean isFavorite = checkFavorite(memberDto.getId(), id);
        //이미 관심등록했다면
        if (isFavorite) {
            throw new FavoriteException(FavoriteExceptionType.ALREADY_EXIST);
        }

        CreateFavoriteStockRequest favoriteRequest = CreateFavoriteStockRequest.builder()
                .stockId(id)
                .memberId(memberDto.getId())
                .build();
        favoriteClient.saveStock(favoriteRequest);
    }

    @Transactional
    public void deleteFavorite(MemberDto memberdto, Long id) {

        Stock stock = getStockEntity(id);
        boolean isFavorite = checkFavorite(memberdto.getId(), id);
        // 관심 등록하지 않았다면
        if (!isFavorite) {
            throw new FavoriteException(FavoriteExceptionType.NOT_FOUND);
        }
        ResponseDto responseDto = favoriteClient.findByMemberAndStock(memberdto.getId(), stock.getId());
        FavoriteDto favoriteDto = (FavoriteDto) responseDto.getData();
//        Favorite favorite = favoriteRepository.findByMemberAndStock(memberdto.getUserId(), stock.getId());
        checkUser(memberdto, favoriteDto);
        favoriteClient.deleteFavorite(favoriteDto);
    }

    /**
     * // TODO 상관관계 추가
     * <p>
     * <p>
     * public Double getCorrelation(Long id, GetCorrelationRequest getCorrelationRequest){
     * Stock stock = getStockEntity(id);
     * ResponseDto responseDto = keywordClient.findAll();
     * List<KeywordDto> all = (List<KeywordDto>) responseDto;
     * System.out.println("all.size() = " + all.size());
     * <p>
     * Long keywordId = getCorrelationRequest.getKeywordId();
     * //        System.out.println("getCorrelationRequest = " + getCorrelationRequest.getKeywordId());
     * //        System.out.println("keywordRepository = " + keywordRepository.findById(keywordId).get());
     * KeywordDto keywordDto = keywordClient.getKeyword(keywordId);
     * //        Keyword keyword = keywordRepository.findById(keywordId).orElseThrow(() ->
     * //                new KeywordException(KeywordExceptionType.KEYWORD_NOT_EXIST));
     * LocalDate startDate = getCorrelationRequest.getStartDate();
     * LocalDate endDate = getCorrelationRequest.getEndDate();
     * //        System.out.println("stock. = " + stock.getName()+" "+keyword.getName());
     * List<CorrelationDto> test = stockRepository.getTest(stock, keyword,startDate, endDate);
     * List<Double> priceList = new ArrayList<>();
     * List<Double> countList = new ArrayList<>();
     * for(CorrelationDto dto : test){
     * countList.add(Double.valueOf(dto.getCount()));
     * priceList.add(Double.valueOf(dto.getClosePrice()));
     * }
     * System.out.println("test = " + test.size());
     * double correlationCoefficient = getCorrelationResult(countList, priceList);
     * return correlationCoefficient;
     * }
     */

    public List<ResultCorrelationDto> getAllStockCorrelation(Long id, GetCorrelationRequest getCorrelationRequest) {
        Stock stock = getStockEntity(id);
        Long industryId = stock.getIndustryId();
        List<StockCorrelationDto> stockList = new ArrayList<>();
        List<Stock> stocksExceptMe = stockRepository.getStocksExceptMe(stock, industryId);
        // 해당 종목을 제외한 주식들에 대하여 상관분석
        for (Stock s : stocksExceptMe) {
            //TODO 상관관계 추가
//            Double correlation = getCorrelation(s.getId(), getCorrelationRequest);
//            stockList.add(new StockCorrelationDto(s,correlation));
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
        List<Stock> stockList = stockRepository.findByIndustry(industryId);
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
        List<Stock> stockList = stockRepository.findByIndustry(industryId);

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

    // 유저가 같은지 체크
    private static void checkUser(MemberDto memberDto, FavoriteDto favoriteDto) {
        if (!favoriteDto.getUserId().equals(memberDto.getId())) {
            throw new FavoriteException(FavoriteExceptionType.DIFFERENT_USER);
        }
    }


    private IndustryDto getIndustry(Long industryId) {
        ResponseDto responseDto = industryClient.geIndustry(industryId);
        IndustryDto industryDto = (IndustryDto) responseDto.getData();
        return industryDto;
    }
}
