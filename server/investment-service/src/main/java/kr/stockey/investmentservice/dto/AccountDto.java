package kr.stockey.investmentservice.dto;

import lombok.Data;

@Data
public class AccountDto {
    private final Long totalAssets;
    private final Long stockValuation;
    private final Long deposit;
}
