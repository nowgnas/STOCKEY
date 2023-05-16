package kr.stockey.stockservice.service;

import kr.stockey.stockservice.api.request.GetCorrelationRequest;
import kr.stockey.stockservice.api.response.GetStockTodayResponse;
import kr.stockey.stockservice.dto.*;
import kr.stockey.stockservice.dto.core.DailyStockDto;
import kr.stockey.stockservice.dto.core.MemberDto;
import kr.stockey.stockservice.dto.core.StockDto;

import java.util.List;

public interface StockService {
     StockSummaryDto getStock(Long stockId) ;
     Integer getStockIndustryMarketCapRank(Long stockId, Long industryId);
     Integer getStockIndustryFavoriteRank(Long stockId, Long industryId);
     Float getAverageIndustryChangeRate(Long industryId) ;
     List<StockPreviewDto> getStock() ;
     List<StockPreviewDto> getStockRandom(Integer count) ;
     List<DailyStockDto> getDailyStock(Long stockId);
     DailyStockDto getTodayDailyStock(Long stockId);
     List<StockSearchDto> getSearchStock(String keyword);

     List<GetStockTodayResponse> getMyStocks(MemberDto member);

     void addFavorite(MemberDto member,Long id);
     void deleteFavorite(MemberDto member,Long id);
     boolean checkFavorite(Long memberId,Long id);

     Double getCorrelation(Long id, GetCorrelationRequest getCorrelationRequest);
     List<ResultCorrelationDto> getAllStockCorrelation(Long id , GetCorrelationRequest getCorrelationRequest);

     // 산업별 종목
     List<StockDto> getByIndustryId(Long industryId);

     // 시가총액순 N개 출력
     List<StockDto> getNStock(int page, int size);
     // 산업별 시가총액순 N개 출력
     List<StockDto> getNStock(Long industryId,int page, int size);

     // 산업별 날짜별 시가총액 합
     List<IndustrySumDto> getMarketList(Long industryId);

     List<GetStockTodayResponse> findTodayDailyStock(Long industryId);


}
