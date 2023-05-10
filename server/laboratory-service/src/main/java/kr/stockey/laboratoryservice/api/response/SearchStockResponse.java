package kr.stockey.laboratoryservice.api.response;

import kr.stockey.laboratoryservice.dto.StockListItemDto;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class SearchStockResponse {
    private final List<StockListItemDto> stockList;

    @Builder
    public SearchStockResponse(List<StockListItemDto> stockList) {
        this.stockList = stockList;
    }
}
