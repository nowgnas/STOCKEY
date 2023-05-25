package kr.stockey.laboratoryservice.domain.stock.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class DailyStockDto {
    private Long id;
    private LocalDate stockDate;
    private Integer openPrice;
    private Integer closePrice;
    private Integer lowPrice;
    private Integer highPrice;
    private Integer volume;
    private Float changeRate;
}
