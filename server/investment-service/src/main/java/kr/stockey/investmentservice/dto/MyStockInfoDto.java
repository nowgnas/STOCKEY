package kr.stockey.investmentservice.dto;

import lombok.Data;

@Data
public class MyStockInfoDto {
    private final Long stockId;
    private final String stockName;
    private final Double svp; // 주식 평가액 비중 (%)
    private final Double rrp; // 수익률 (%)
    private final Long curStockPrice; // 주식 현재 가격 *
    private final Double avgPrice; // 주식 평단 *
    private final Long count; // 보유중인 주식 수 *
}
