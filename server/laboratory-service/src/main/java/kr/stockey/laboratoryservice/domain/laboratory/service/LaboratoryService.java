package kr.stockey.laboratoryservice.domain.laboratory.service;

import kr.stockey.laboratoryservice.domain.laboratory.dto.ResponseDto;
import kr.stockey.laboratoryservice.domain.stock.dto.StockSearchDto;

import java.util.List;

public interface LaboratoryService {

    List<StockSearchDto> searchStocks(String stock);

    ResponseDto feignTest(String feignTest);
}
