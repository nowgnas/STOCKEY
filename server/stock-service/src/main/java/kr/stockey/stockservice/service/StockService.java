package kr.stockey.stockservice.service;

import com.ssafy.backend.domain.keyword.dto.StockKeywordDto;
import com.ssafy.backend.domain.member.entity.Member;
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

     List<GetStockTodayResponse> getMyStocks(Member member);

     void addFavorite(Member member,Long id);
     void deleteFavorite(Member member,Long id);
     boolean checkFavorite(Member member,Long id);

     Double getCorrelation(Long id, GetCorrelationRequest getCorrelationRequest);
     List<ResultCorrelationDto> getAllStockCorrelation(Long id , GetCorrelationRequest getCorrelationRequest);


}
