package kr.stockey.laboratoryservice.api.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class SearchStockResponse {
    private final String name;
    private final Long id;

    @Builder
    public SearchStockResponse(String name, Long id) {
        this.name = name;
        this.id = id;
    }
}
