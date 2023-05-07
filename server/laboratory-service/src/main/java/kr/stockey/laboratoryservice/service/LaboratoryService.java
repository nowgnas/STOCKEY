package kr.stockey.laboratoryservice.service;

import kr.stockey.laboratoryservice.api.response.SearchStockResponse;
import kr.stockey.laboratoryservice.dto.StockListItemDto;
import kr.stockey.laboratoryservice.entity.Stock;
import kr.stockey.laboratoryservice.mapper.LaboratoryMapper;
import kr.stockey.laboratoryservice.repository.LaboratoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LaboratoryService {
    private final LaboratoryRepository laboratoryRepository;
    private final LaboratoryMapper laboratoryMapper;

    /**
     * 사용자가 입력인 주식 이름으로 시작하는 주식 종목 검색
     *
     * @param name 사용자 입력 주식 종목 이름
     * @return 입력된 단어로 시작하는 주식종목 리스트(주식 이름, 종목 id)
     */
    public SearchStockResponse searchStock(String name) {
        List<Stock> stocks = laboratoryRepository.searchByName(name);
        List<StockListItemDto> stockListItemDtos = laboratoryMapper.toStockItemList(stocks);
        return SearchStockResponse.builder()
                .stockList(stockListItemDtos)
                .build();
    }
}
