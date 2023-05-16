package kr.stockey.laboratoryservice.domain.laboratory.service;

import kr.stockey.laboratoryservice.common.openfeign.LaboratoryFeignClient;
import kr.stockey.laboratoryservice.domain.keyword.dto.KeywordSearchDto;
import kr.stockey.laboratoryservice.domain.laboratory.dto.ResponseDto;
import kr.stockey.laboratoryservice.domain.stock.dto.StockSearchDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LaboratoryServiceImpl implements LaboratoryService {
    private final LaboratoryFeignClient laboratoryFeignClient;

    @Override
    public List<StockSearchDto> searchStocks(String keyword) {
        return laboratoryFeignClient.getStockSearch(keyword);
    }

    @Override
    public List<KeywordSearchDto> searchKeyword(String keyword) {
        ResponseDto keywordSearch = laboratoryFeignClient.getKeywordSearch(keyword);
        Object data = keywordSearch.getData();
        System.out.println(data);
        return null;
    }
}
