package kr.stockey.investmentservice.dto;

import kr.stockey.investmentservice.enums.ContractType;
import kr.stockey.investmentservice.enums.InvCategory;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ContractDto {
    private final Long id;
    private final Long memberId;
    private final Long stockId;
    private final Long count;
    private final Long contractPrice;
    private final ContractType contractType;
    private final LocalDateTime createdAt;
    private final InvCategory category;
    private final Long matchOrderId;
    private final Double profit;
}
