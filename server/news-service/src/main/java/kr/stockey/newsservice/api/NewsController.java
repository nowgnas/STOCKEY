package kr.stockey.newsservice.api;

import kr.stockey.newsservice.api.request.NewsCountRequest;
import kr.stockey.newsservice.dto.core.ResponseDto;
import kr.stockey.newsservice.service.NewsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/news")
@RequiredArgsConstructor
public class NewsController {
    private final NewsService newsService;

    @PostMapping("/domain/count")
    public ResponseEntity<ResponseDto> getNewsCountByDomain(@RequestBody @Valid NewsCountRequest request) {
        Long count = newsService.getTotalNewsCount(request);
        return new ResponseEntity<>(new ResponseDto("OK", count), HttpStatus.OK);
    }


}
