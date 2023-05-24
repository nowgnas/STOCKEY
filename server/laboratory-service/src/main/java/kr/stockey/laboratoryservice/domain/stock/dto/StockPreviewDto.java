package kr.stockey.laboratoryservice.domain.stock.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StockPreviewDto {
    private Long id;
    private String name;
    private String code;
    private DailyStockDto todayDailyStock;

}
