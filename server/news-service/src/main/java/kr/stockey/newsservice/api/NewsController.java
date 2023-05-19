package kr.stockey.newsservice.api;

import kr.stockey.newsservice.api.request.NewsCountRequest;
import kr.stockey.newsservice.dto.GetTopNKeywordRequest;
import kr.stockey.newsservice.dto.TopKeywordCountDto;
import kr.stockey.newsservice.service.NewsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/news")
@RequiredArgsConstructor
public class NewsController {
    private final NewsService newsService;

    /* --------------  다른 서비스에서 호출하는 메소드 [start] ----------------  */
    @PostMapping("/client/domain/count")
    public ResponseEntity<Long> getNewsCountByDomain(@RequestBody @Valid NewsCountRequest request) {
        Long count = newsService.getTotalNewsCount(request);
        return new ResponseEntity<>(count, HttpStatus.OK);
    }


    @PostMapping("/client/top-keyword")
    public ResponseEntity<List<TopKeywordCountDto>> getTopNKeywordsForEconomy(@RequestBody @Valid GetTopNKeywordRequest request) {
        List<TopKeywordCountDto> result = newsService.getTopNKeywordsForEconomy(request);
        return new ResponseEntity<>(result, HttpStatus.OK);

    }

    /* --------------  다른 서비스에서 호출하는 메소드 [end]  ----------------  */




}
