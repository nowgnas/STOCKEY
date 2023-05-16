package kr.stockey.investmentservice.dto;

import kr.stockey.investmentservice.enums.ContractType;
import kr.stockey.investmentservice.enums.InvCategory;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class OrderHistoryDto {
    private Long stockId;
    private String stockName;
    private Long orderCount; // 주문 수량
    private Long contractCount; // 실제 체결된 수량
    private Long contractPrice; // 거래 체결 금액
    private Double profit; // 실현 손익
    private ContractType contractType; // BUY, SELL
    private LocalDateTime createdAt; // 주문 시간
}
