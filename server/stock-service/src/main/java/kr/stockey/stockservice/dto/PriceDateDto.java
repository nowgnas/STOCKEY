package kr.stockey.stockservice.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class PriceDateDto {
    private LocalDate stockDate;
    private Integer closePrice;

}
