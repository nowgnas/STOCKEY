package kr.stockey.laboratoryservice.domain.laboratory.service;

import kr.stockey.laboratoryservice.domain.keyword.dto.KeywordSearchDto;
import kr.stockey.laboratoryservice.domain.stock.dto.StockSearchDto;

import java.util.List;

public interface LaboratoryService {

    List<StockSearchDto> searchStocks(String stock);

    List<KeywordSearchDto> searchKeyword(String keyword);
}
