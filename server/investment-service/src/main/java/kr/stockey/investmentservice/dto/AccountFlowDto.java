package kr.stockey.investmentservice.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class AccountFlowDto {
    private Long stockId;
    private String stockName;
    private Double stockValuation; // 주식 평가금액
    private LocalDate date; // 날짜(2023-05-12)
}
