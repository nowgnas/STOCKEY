package kr.stockey.laboratoryservice.domain.laboratory.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StockPriceNFreqDto {
    private Integer price;
    private Long freq;

    @Builder
    public StockPriceNFreqDto(Integer price, Long freq) {
        this.price = price;
        this.freq = freq;
    }
}
