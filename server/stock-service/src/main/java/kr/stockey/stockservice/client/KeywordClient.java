package kr.stockey.stockservice.client;


import kr.stockey.stockservice.dto.ResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name = "keyword-service")
public interface KeywordClient {

    // TODO url 작성
    @GetMapping("")
    ResponseDto findStockKeywords(Long stockId);


}
