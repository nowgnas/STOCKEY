package kr.stockey.laboratoryservice.domain.laboratory.service;

import kr.stockey.laboratoryservice.common.openfeign.LaboratoryFeignClient;
import kr.stockey.laboratoryservice.domain.keyword.dto.KeywordSearchDto;
import kr.stockey.laboratoryservice.domain.laboratory.api.response.GraphDataResponse;
import kr.stockey.laboratoryservice.domain.laboratory.api.response.RegressionResponse;
import kr.stockey.laboratoryservice.domain.laboratory.dto.ResponseDto;
import kr.stockey.laboratoryservice.domain.laboratory.mapper.LaboratoryMapper;
import kr.stockey.laboratoryservice.domain.stock.dto.StockPreviewDto;
import kr.stockey.laboratoryservice.domain.stock.dto.StockSearchDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LaboratoryServiceImpl implements LaboratoryService {
    private final LaboratoryFeignClient laboratoryFeignClient;
    private final LaboratoryMapper laboratoryMapper;

    @Override
    public RegressionResponse getRegression(String stock, List<Long> idList) {
        for (Long id : idList) {
            ResponseDto keywordDaily = laboratoryFeignClient.getKeywordDaily(id);

        }
    }

    @Override
    public GraphDataResponse getGraphData(List<Long> idList) {
        return null;
    }

    @Override
    public List<StockSearchDto> getAllStock() {
        List<StockPreviewDto> allStock = laboratoryFeignClient.getAllStock();
        return laboratoryMapper.toStockList(allStock);
    }

    /**
     * 주식 종목 검색
     *
     * @param keyword 사용자 입력
     * @return 주식 종목 리스트
     */
    @Override
    public List<StockSearchDto> searchStocks(String keyword) {
        return laboratoryFeignClient.getStockSearch(keyword);
    }

    /**
     * 키워드 검색
     *
     * @param keyword 사용자 입력
     * @return 키워드 리스트
     */
    @Override
    public List<KeywordSearchDto> searchKeyword(String keyword) {
        ResponseDto keywordSearch = laboratoryFeignClient.getKeywordSearch(keyword);
        List<Object> data = (List<Object>) keywordSearch.getData();
        List<KeywordSearchDto> list = new ArrayList<>();
        for (Object item :
                data) {
            LinkedHashMap<String, ?> map = (LinkedHashMap<String, ?>) item;
            list.add(KeywordSearchDto.builder()
                    .id(((Integer) map.get("id")).longValue())
                    .name((String) map.get("name"))
                    .build());
        }
        return list;
    }
}
