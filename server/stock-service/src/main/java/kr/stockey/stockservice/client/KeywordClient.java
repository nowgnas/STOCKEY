package kr.stockey.stockservice.client;


import kr.stockey.stockservice.dto.KeywordCountDateDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "keyword-service")
public interface KeywordClient {

    @GetMapping("/keywords/client/correlation/{keywordId}")
    List<KeywordCountDateDto> getCountDate(@PathVariable("keywordId") Long keywordId,
                                           @RequestParam("startDate") String startDate,
                                           @RequestParam("endDate") String endDate);

}
