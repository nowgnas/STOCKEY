package kr.stockey.stockservice.client;


import kr.stockey.stockservice.dto.core.ResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name = "industry-service")
public interface IndustryClient {

    @GetMapping("/{industryId}")
    ResponseDto geIndustry(Long industryId);
}
