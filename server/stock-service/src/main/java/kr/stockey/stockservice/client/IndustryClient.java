package kr.stockey.stockservice.client;


import kr.stockey.stockservice.dto.core.IndustryDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name = "industry-service")
public interface IndustryClient {

    @GetMapping("/industry/client/{industryId}")
    IndustryDto geIndustry(Long industryId);
}
