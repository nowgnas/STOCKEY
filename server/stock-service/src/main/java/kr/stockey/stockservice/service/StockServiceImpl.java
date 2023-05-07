package kr.stockey.stockservice.service;

import com.ssafy.backend.domain.favorites.entity.Favorite;
import com.ssafy.backend.domain.favorites.repository.FavoriteRepository;
import com.ssafy.backend.domain.favorites.service.FavoriteService;
import com.ssafy.backend.domain.industry.dto.IndustryDto;
import com.ssafy.backend.domain.industry.entity.Industry;
import com.ssafy.backend.domain.industry.mapper.IndustryMapper;
import com.ssafy.backend.domain.industry.repository.IndustryRepository;
import com.ssafy.backend.domain.keyword.dto.StockKeywordDto;
import com.ssafy.backend.domain.keyword.entity.Keyword;
import com.ssafy.backend.domain.keyword.repository.KeywordRepository;
import com.ssafy.backend.domain.keyword.repository.KeywordStatisticRepository;
import com.ssafy.backend.domain.keyword.service.KeywordService;
import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.stock.api.request.GetCorrelationRequest;
import com.ssafy.backend.domain.stock.api.response.GetStockTodayResponse;
import com.ssafy.backend.domain.stock.dto.*;
import com.ssafy.backend.domain.stock.entity.DailyStock;
import com.ssafy.backend.domain.stock.entity.Stock;
import com.ssafy.backend.domain.stock.mapper.BusinessMapper;
import com.ssafy.backend.domain.stock.mapper.StockDtoMapper;
import com.ssafy.backend.domain.stock.mapper.StockMapper;
import com.ssafy.backend.domain.stock.repository.DailyStockRepository;
import com.ssafy.backend.domain.stock.repository.StockRepository;
import com.ssafy.backend.global.exception.dailyStock.DailyStockException;
import com.ssafy.backend.global.exception.dailyStock.DailyStockExceptionType;
import com.ssafy.backend.global.exception.favorite.FavoriteException;
import com.ssafy.backend.global.exception.favorite.FavoriteExceptionType;
import com.ssafy.backend.global.exception.keyword.KeywordException;
import com.ssafy.backend.global.exception.keyword.KeywordExceptionType;
import com.ssafy.backend.global.exception.stock.StockException;
import com.ssafy.backend.global.exception.stock.StockExceptionType;
import lombok.RequiredArgsConstructor;
import org.apache.commons.math3.stat.correlation.PearsonsCorrelation;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StockServiceImpl implements StockService{


    private final StockRepository stockRepository;
    private final StockMapper stockMapper;
    private final StockDtoMapper stockDtoMapper;
    private final IndustryMapper industryMapper;
    private final BusinessMapper businessMapper;
    private final KeywordRepository keywordRepository;
    private final KeywordStatisticRepository keywordStatisticRepository;
    private final FavoriteRepository favoriteRepository;
    private final FavoriteService favoriteService;
    private final KeywordService keywordService;

    private final DailyStockRepository dailyStockRepository;
    private final IndustryRepository industryRepository;

    public StockDto getStock(Long stockId)  {
        Stock stock = stockRepository.findById(stockId).orElseThrow(()->new StockException(StockExceptionType.NOT_FOUND));
        StockDto stockDto = stockMapper.toStockDto(stock);
        int industryTotalCount = stockRepository.findByIndustry(stock.getIndustry()).size();
        stockDto.setIndustryTotalCount(industryTotalCount);
        IndustryDto industryDto = industryMapper.toDto(stock.getIndustry());
        List<BusinessDto> businessDtos = businessMapper.toDto(stock.getBusinesses());
        stockDto.setIndustry(industryDto);
        stockDto.setBusinesses(businessDtos);
        Integer marketCapRank = getStockIndustryMarketCapRank(stockId, industryDto.getId());
        stockDto.setIndustryCapRank(marketCapRank);
        Integer favoriteRank = getStockIndustryFavoriteRank(stockId, industryDto.getId());
        stockDto.setIndustryFavRank(favoriteRank);
        Float avgRate = getAverageIndustryChangeRate(industryDto.getId());
        stockDto.setIndustryAvgChangeRate(avgRate);
        DailyStockDto dailyStockDto =getTodayDailyStock(stockId);
        stockDto.setTodayDailyStock(dailyStockDto);
        return stockDto;
    }

    public Integer getStockIndustryMarketCapRank(Long stockId, Long industryId){
        Integer rank = stockRepository.findIndustryMarketCapRank(stockId, industryId);
        return rank;
    }

    public Integer getStockIndustryFavoriteRank(Long stockId,Long industryId){
        Integer rank = stockRepository.findIndustryFavoriteRank(stockId,industryId);
        if(rank == null){
            return 0;
        }
        return rank;
    }

    public Float getAverageIndustryChangeRate(Long industryId) {
        Float avgChangeRate = stockRepository.findAverageIndustryChangeRate(industryId);
        return avgChangeRate;
    }

    public List<StockPreviewDto> getStock()  {
        List<Stock> stocks = stockRepository.findAll();
        List<StockPreviewDto> stockPreviewDtos = new ArrayList<>();
        for (Stock s :stocks){
            StockPreviewDto stockPreviewDto = stockMapper.toPreviewDto(s);
            DailyStockDto dailyStockDto =getTodayDailyStock(s.getId());
            stockPreviewDto.setTodayDailyStock(dailyStockDto);
            stockPreviewDtos.add(stockPreviewDto);
        }
        return stockPreviewDtos;
    }

    public List<StockPreviewDto> getStockRandom(Integer count) {
        List<Stock> stocks = stockRepository.findStockRandom(count);
        List<StockPreviewDto> stockPreviewDtos = new ArrayList<>();
        for (Stock s :stocks){
            StockPreviewDto stockPreviewDto = stockMapper.toPreviewDto(s);
            DailyStockDto dailyStockDto =getTodayDailyStock(s.getId());
            stockPreviewDto.setTodayDailyStock(dailyStockDto);
            stockPreviewDtos.add(stockPreviewDto);
        }
        return stockPreviewDtos;
    }


    public List<StockKeywordDto> getStockKeyword(Long stockId){
        List<StockKeywordDto> stockKeyword = keywordRepository.findStockKeywords(stockId);
        return stockKeyword;
    }

    public List<DailyStockDto> getDailyStock(Long stockId) {
        List<DailyStock> dailyStock = dailyStockRepository.findByStockId(stockId);
        List<DailyStockDto> dailyStockDtos = stockMapper.toDailyStockDto(dailyStock);
        return dailyStockDtos;
    }

    public DailyStockDto getTodayDailyStock(Long stockId){
        Stock stock = stockRepository.findById(stockId).orElseThrow(() -> new StockException(StockExceptionType.NOT_FOUND));
        DailyStock dailyStock = dailyStockRepository
                .findTodayDailyStock(stock.getId())
                .orElseThrow(()->new DailyStockException(com.ssafy.backend.global.exception.stock.DailyStockExceptionType.NOT_FOUND));
        DailyStockDto dailyStockDto = stockMapper.toDailyStockDto(dailyStock);
        return dailyStockDto;
    }

    public List<StockSearchDto> getSearchStock(String keyword) {
        keyword = '%'+keyword+'%';
        List<Stock> stocks = stockRepository.findByName(keyword);
        List<StockSearchDto> stockSearchDtos = stockMapper.toSearchDto(stocks);
        return stockSearchDtos;
    }

    // 관심 종목 리스트 출력
    public List<GetStockTodayResponse> getMyStocks(Member member) {
        List<Favorite> favorites = favoriteService._findByStock(member);
        List<Stock> stockList = new ArrayList<>();


        List<StockTodayDto> result = new ArrayList<>();
        for (Favorite favorite : favorites) {
            Stock stock =  favorite.getStock();
            DailyStock dailyStock = dailyStockRepository.findTodayDailyStock(stock.getId())
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
    public boolean checkFavorite(Member member, Long id) {
        Stock industry = getStockEntity(id);
        return favoriteService.existsByMemberAndStock(industry, member);
    }

    // 관심 산업 등록
    @Transactional
    public void addFavorite(Member member, Long id) {
        Stock stock = getStockEntity(id);
        boolean isFavorite = checkFavorite(member, id);
        //이미 관심등록했다면
        if (isFavorite) {
            throw new FavoriteException(FavoriteExceptionType.ALREADY_EXIST);
        }
        Favorite favorite = Favorite.stockBuilder()
                .member(member)
                .stock(stock)
                .build();
        favoriteRepository.save(favorite);

    }

    @Transactional
    public void deleteFavorite(Member member, Long id) {

        Stock stock = getStockEntity(id);
        boolean isFavorite = checkFavorite(member, id);
        // 관심 등록하지 않았다면
        if (!isFavorite) {
            throw new FavoriteException(FavoriteExceptionType.NOT_FOUND);
        }
        Favorite favorite = favoriteRepository.findByMemberAndStock(member, stock);
        checkUser(member, favorite);
        favoriteRepository.delete(favorite);
    }

    public Double getCorrelation(Long id, GetCorrelationRequest getCorrelationRequest){
        Stock stock = getStockEntity(id);
        List<Keyword> all = keywordRepository.findAll();
        System.out.println("all.size() = " + all.size());

        Long keywordId = getCorrelationRequest.getKeywordId();
        System.out.println("getCorrelationRequest = " + getCorrelationRequest.getKeywordId());
        System.out.println("keywordRepository = " + keywordRepository.findById(keywordId).get());
        Keyword keyword = keywordRepository.findById(keywordId).orElseThrow(() ->
                new KeywordException(KeywordExceptionType.KEYWORD_NOT_EXIST));
        LocalDate startDate = getCorrelationRequest.getStartDate();
        LocalDate endDate = getCorrelationRequest.getEndDate();
        System.out.println("stock. = " + stock.getName()+" "+keyword.getName());
        List<CorrelationDto> test = stockRepository.getTest(stock, keyword,startDate, endDate);
        List<Double> priceList = new ArrayList<>();
        List<Double> countList = new ArrayList<>();
        for(CorrelationDto dto : test){
            countList.add(Double.valueOf(dto.getCount()));
            priceList.add(Double.valueOf(dto.getClosePrice()));
        }
        System.out.println("test = " + test.size());
        double correlationCoefficient = getCorrelationResult(countList, priceList);
        return correlationCoefficient;
    }
    public List<ResultCorrelationDto> getAllStockCorrelation(Long id ,GetCorrelationRequest getCorrelationRequest){
        Stock stock = getStockEntity(id);
//        Industry industry = industryRepository.findById(id).orElseThrow(() -> new IndustryException(IndustryExceptionType.NOT_FOUND));
        Industry industry = stock.getIndustry();
        List<StockCorrelationDto> stockList = new ArrayList<>();
        List<Stock> stocksExceptMe = stockRepository.getStocksExceptMe(stock,industry);
        // 해당 종목을 제외한 주식들에 대하여 상관분석
        for(Stock s : stocksExceptMe){
            Double correlation = getCorrelation(s.getId(), getCorrelationRequest);
            stockList.add(new StockCorrelationDto(s,correlation));
        }
        Collections.sort(stockList);


        List<ResultCorrelationDto> result = new ArrayList<>();
        //상위 3개
        for(int i = 0; i<3;i++){
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


    // Stock Entity 반환
    private Stock getStockEntity(Long id) {
        return stockRepository.findById(id).orElseThrow(() -> new StockException(StockExceptionType.NOT_FOUND));
    }

    // 유저가 같은지 체크
    private static void checkUser(Member member, Favorite favorite) {
        if (favorite.getMember() != member) {
            throw new FavoriteException(FavoriteExceptionType.DIFFERENT_USER);
        }
    }
}
