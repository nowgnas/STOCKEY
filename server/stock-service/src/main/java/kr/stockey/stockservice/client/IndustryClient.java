package kr.stockey.stockservice.client;


import kr.stockey.stockservice.dto.core.IndustryDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "industry-service")
public interface IndustryClient {

    @GetMapping("/industry/client/{industryId}")
    IndustryDto geIndustry(@PathVariable("industryId") Long industryId);
}
