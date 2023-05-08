package kr.stockey.stockservice.service;

import kr.stockey.stockservice.api.request.GetCorrelationRequest;
import kr.stockey.stockservice.api.response.GetStockTodayResponse;
import kr.stockey.stockservice.dto.*;

import java.util.List;

public interface StockService {
     StockDto getStock(Long stockId) ;
     Integer getStockIndustryMarketCapRank(Long stockId, Long industryId);
     Integer getStockIndustryFavoriteRank(Long stockId, Long industryId);
     Float getAverageIndustryChangeRate(Long industryId) ;
     List<StockPreviewDto> getStock() ;
     List<StockPreviewDto> getStockRandom(Integer count) ;
     List<StockKeywordDto> getStockKeyword(Long stockId) ;
     List<DailyStockDto> getDailyStock(Long stockId);
     DailyStockDto getTodayDailyStock(Long stockId);
     List<StockSearchDto> getSearchStock(String keyword);

     List<GetStockTodayResponse> getMyStocks(MemberDto member);

     void addFavorite(MemberDto member,Long id);
     void deleteFavorite(MemberDto member,Long id);
     boolean checkFavorite(String userId,Long id);

     // TODO 상관관계 추가
//     Double getCorrelation(Long id, GetCorrelationRequest getCorrelationRequest);
     List<ResultCorrelationDto> getAllStockCorrelation(Long id , GetCorrelationRequest getCorrelationRequest);


}
