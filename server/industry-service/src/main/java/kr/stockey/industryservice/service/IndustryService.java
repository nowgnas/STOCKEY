package kr.stockey.industryservice.service;

import kr.stockey.industryservice.api.response.GetIndustryMarketCapResponse;
import kr.stockey.industryservice.api.response.IndustryCapitalDto;
import kr.stockey.industryservice.dto.core.IndustryDto;
import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.stock.api.response.GetStockTodayResponse;
import com.ssafy.backend.domain.stock.dto.StockBriefDto;

import java.util.List;

public interface IndustryService {
     List<IndustryDto> getAll();
     IndustryDto getOne(Long id);
     List<IndustryCapitalDto> getAllMarketCap();
     List<StockBriefDto> getStockList();
     List<StockBriefDto> getStockList(Long id);
     List<IndustryDto> getMyIndustries();

     void addFavorite(Long id);
     void deleteFavorite(Long id);
     boolean checkFavorite(Long id);

     List<GetIndustryMarketCapResponse> getMarketCapList(Long id);

     List<GetStockTodayResponse> getStockListPrice(Long id);





}
