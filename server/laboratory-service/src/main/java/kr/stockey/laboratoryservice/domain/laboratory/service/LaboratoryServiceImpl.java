package kr.stockey.laboratoryservice.domain.laboratory.service;

import kr.stockey.laboratoryservice.common.openfeign.LaboratoryFeignClient;
import kr.stockey.laboratoryservice.domain.keyword.dto.KeywordSearchDto;
import kr.stockey.laboratoryservice.domain.laboratory.dto.ResponseDto;
import kr.stockey.laboratoryservice.domain.stock.dto.StockSearchDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LaboratoryServiceImpl implements LaboratoryService {
    private final LaboratoryFeignClient laboratoryFeignClient;
//    private final LaboratoryMapper laboratoryMapper;

    @Override
    public List<StockSearchDto> searchStocks(String keyword) {
        return laboratoryFeignClient.getStockSearch(keyword);
    }

    @Override
    public List<KeywordSearchDto> searchKeyword(String keyword) {
        ResponseDto keywordSearch = laboratoryFeignClient.getKeywordSearch(keyword);
        List<Object> data = (List<Object>) keywordSearch.getData();
        System.out.println(data.getClass());
        List<KeywordSearchDto> keywordSearchDtos = new ArrayList<>();
        if (!data.isEmpty()) {
            Map<String, String> map = (Map<String, String>) data;
            keywordSearchDtos.add(KeywordSearchDto.builder()
                    .id(Long.valueOf(map.get("id")))
                    .name(map.get("name"))
                    .build());
        }
        return keywordSearchDtos;
    }
}
