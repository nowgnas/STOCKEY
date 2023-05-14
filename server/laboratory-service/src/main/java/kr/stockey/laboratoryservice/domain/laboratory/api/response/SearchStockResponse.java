package kr.stockey.laboratoryservice.domain.laboratory.api.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class SearchStockResponse {
    private final List<SearchStockResponse> stockList;

    @Builder
    public SearchStockResponse(List<SearchStockResponse> stockList) {
        this.stockList = stockList;
    }
}
