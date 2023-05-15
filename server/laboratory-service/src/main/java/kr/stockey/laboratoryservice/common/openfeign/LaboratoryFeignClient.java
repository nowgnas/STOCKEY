package kr.stockey.laboratoryservice.common.openfeign;

import kr.stockey.laboratoryservice.domain.laboratory.dto.ResponseDto;
import kr.stockey.laboratoryservice.domain.stock.dto.StockSearchDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "laboratory-service", url = "https://stockey.kr/api")
public interface LaboratoryFeignClient {
    @GetMapping("/stock/search")
    List<StockSearchDto> getStockSearch(@RequestParam String stock);

    @GetMapping("/api/lab/feign/data/{data}")
    ResponseEntity<ResponseDto> testFeign(@PathVariable String data);
}
