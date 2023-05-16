package kr.stockey.laboratoryservice.common.openfeign;

import kr.stockey.laboratoryservice.domain.laboratory.dto.ResponseDto;
import kr.stockey.laboratoryservice.domain.stock.dto.StockSearchDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "laboratory-service", url = "https://stockey.kr/api")
public interface LaboratoryFeignClient {
    @GetMapping("/stock/search")
    List<StockSearchDto> getStockSearch(@RequestParam String keyword);

    @GetMapping("/keywords/search")
    ResponseDto getKeywordSearch(@RequestParam String keyword);
}
