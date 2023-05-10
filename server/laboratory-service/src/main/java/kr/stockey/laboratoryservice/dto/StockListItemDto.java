package kr.stockey.laboratoryservice.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class StockListItemDto {
    private final String name;
    private final Long id;

    @Builder
    public StockListItemDto(String name, Long id) {
        this.name = name;
        this.id = id;
    }
}
