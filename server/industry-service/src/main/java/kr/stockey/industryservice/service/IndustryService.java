package kr.stockey.industryservice.service;

import kr.stockey.industryservice.api.response.GetIndustryMarketCapResponse;
import kr.stockey.industryservice.api.response.IndustryCapitalDto;
import kr.stockey.industryservice.dto.GetStockTodayResponse;
import kr.stockey.industryservice.dto.StockBriefDto;
import kr.stockey.industryservice.dto.core.IndustryDto;
import kr.stockey.industryservice.dto.core.MemberDto;

import java.util.List;

public interface IndustryService {
     List<IndustryDto> getAll();
     IndustryDto getOne(Long id);
     List<IndustryCapitalDto> getAllMarketCap();
     List<StockBriefDto> getStockList();
     List<StockBriefDto> getStockList(Long id);
     List<IndustryDto> getMyIndustries(MemberDto memberDto);

     void addFavorite(MemberDto memberDto,Long id);
     void deleteFavorite(MemberDto memberDto,Long id);
     boolean checkFavorite(Long memberId,Long id);

     List<GetIndustryMarketCapResponse> getMarketCapList(Long id);

     List<GetStockTodayResponse> getStockListPrice(Long id);





}
