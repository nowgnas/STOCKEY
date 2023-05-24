package kr.stockey.laboratoryservice.domain.laboratory.service;

import kr.stockey.laboratoryservice.domain.keyword.dto.KeywordSearchDto;
import kr.stockey.laboratoryservice.domain.laboratory.api.response.RegressionResponse;
import kr.stockey.laboratoryservice.domain.stock.dto.StockSearchDto;

import java.util.List;

public interface LaboratoryService {

    /**
     * 주식 종목 검색
     *
     * @param stock 사용자 입력
     * @return 주식 종목 리스트
     */
    List<StockSearchDto> searchStocks(String stock);

    /**
     * 키워드 검색
     *
     * @param keyword 사용자 입력
     * @return 키워드 리스트
     */
    List<KeywordSearchDto> searchKeyword(String keyword);

    List<StockSearchDto> getAllStock();

    RegressionResponse getGraphData(Long stock, Long id1, Long id2, Long id3);
}
