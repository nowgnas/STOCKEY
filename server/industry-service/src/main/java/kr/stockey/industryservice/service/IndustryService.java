package kr.stockey.industryservice.service;

import com.ssafy.backend.domain.industry.api.response.GetIndustryMarketCapResponse;
import com.ssafy.backend.domain.industry.api.response.IndustryCapitalDto;
import com.ssafy.backend.domain.industry.dto.IndustryDto;
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
     List<IndustryDto> getMyIndustries(Member member);

     void addFavorite(Member member,Long id);
     void deleteFavorite(Member member,Long id);
     boolean checkFavorite(Member member,Long id);

     List<GetIndustryMarketCapResponse> getMarketCapList(Long id);

     List<GetStockTodayResponse> getStockListPrice(Long id);





}
