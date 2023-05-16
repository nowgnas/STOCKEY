package kr.stockey.investmentservice.dto;

import lombok.Data;

@Data
public class AccountDto {
    private Long totalAssets;
    private Long stockValuation;
    private Long deposit;
}
