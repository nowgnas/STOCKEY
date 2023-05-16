package kr.stockey.investmentservice.dto;

import kr.stockey.investmentservice.enums.ContractType;
import kr.stockey.investmentservice.enums.InvCategory;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class OrderHistoryDto {
    private final Long stockId;
    private final String stockName;
    private final Long orderCount; // 주문 수량
    private final Long contractCount; // 실제 체결된 수량
    private final Long contractPrice; // 거래 체결 금액
    private final Double profit; // 실현 손익
    private final ContractType contractType; // BUY, SELL
    private final LocalDateTime createdAt; // 주문 시간
}
