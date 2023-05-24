package kr.stockey.keywordservice.client;

import kr.stockey.keywordservice.api.request.GetTopNKeywordRequest;
import kr.stockey.keywordservice.api.request.NewsCountRequest;
import kr.stockey.keywordservice.dto.TopKeywordCountDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@FeignClient(name = "news-service")
public interface NewsClient {


    @PostMapping("/news/client/domain/count")
    Long getNewsCountByDomain(NewsCountRequest request);

    @PostMapping("/news/client/top-keyword")
    List<TopKeywordCountDto> getTopNKeywords(GetTopNKeywordRequest request);




}
