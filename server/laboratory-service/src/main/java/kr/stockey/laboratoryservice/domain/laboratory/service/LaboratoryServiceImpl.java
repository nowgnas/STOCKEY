package kr.stockey.laboratoryservice.domain.laboratory.service;

import kr.stockey.laboratoryservice.common.openfeign.LaboratoryFeignClient;
import kr.stockey.laboratoryservice.domain.laboratory.dto.ResponseDto;
import kr.stockey.laboratoryservice.domain.stock.dto.StockSearchDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LaboratoryServiceImpl implements LaboratoryService {
    private final LaboratoryFeignClient laboratoryFeignClient;

    @Override
    public List<StockSearchDto> searchStocks(String stock) {
        return laboratoryFeignClient.getStockSearch(stock);
    }

    @Override
    public ResponseDto feignTest(String feignTest) {
        ResponseEntity<ResponseDto> responseDtoResponseEntity = laboratoryFeignClient.testFeign(feignTest);
        if (responseDtoResponseEntity.getStatusCode().is2xxSuccessful()) {
            return responseDtoResponseEntity.getBody();
        }
        return null;
    }
}
