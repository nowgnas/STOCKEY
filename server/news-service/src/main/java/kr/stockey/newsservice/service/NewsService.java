package kr.stockey.newsservice.service;

import kr.stockey.newsservice.api.request.NewsCountRequest;
import kr.stockey.newsservice.dto.GetTopNKeywordRequest;
import kr.stockey.newsservice.dto.TopKeywordCountDto;

import java.util.List;

public interface NewsService {
    Long getTotalNewsCount(NewsCountRequest request);

    List<TopKeywordCountDto> getTopNKeywordsForEconomy(GetTopNKeywordRequest request);


}
