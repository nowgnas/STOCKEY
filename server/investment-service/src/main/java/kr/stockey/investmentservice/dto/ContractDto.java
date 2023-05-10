package kr.stockey.investmentservice.dto;

import kr.stockey.investmentservice.enums.ContractType;
import kr.stockey.investmentservice.enums.InvCategory;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ContractDto {
    private Long id;
    private Long memberId;
    private Long stockId;
    private Long count;
    private ContractType contractType;
    private LocalDateTime createdAt;
    private InvCategory category;
}
