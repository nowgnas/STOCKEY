package kr.stockey.investmentservice.dto;

import lombok.Data;

@Data
public class MyStockInfoDto {
    private final Long stockId;
    private final String stockName;
    private final Double svp; // 주식 평가액 비중 (%)
    private final Double rrp; // 수익률 (%)
}
