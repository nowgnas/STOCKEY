package kr.stockey.investmentservice.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class AccountFlowDto {
    private final Long stockId;
    private final String stockName;
    private final Double stockValuation; // 주식 평가금액
    private final LocalDate date; // 날짜(2023-05-12)
}
