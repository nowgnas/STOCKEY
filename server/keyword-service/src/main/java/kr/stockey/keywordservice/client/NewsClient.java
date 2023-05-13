package kr.stockey.keywordservice.client;

import kr.stockey.keywordservice.api.request.NewsCountRequest;
import kr.stockey.keywordservice.dto.core.ResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient(name = "news-service")
public interface NewsClient {

    @PostMapping("/news/domain/count")
    ResponseDto getNewsCountByDomain(NewsCountRequest request);

}
