package kr.stockey.stockservice.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class StockPreviewDto {
    private Long id;
    private String name;
    private String code;
    private DailyStockDto todayDailyStock;
}
