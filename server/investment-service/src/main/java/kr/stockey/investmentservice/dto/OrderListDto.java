package kr.stockey.investmentservice.dto;

import kr.stockey.investmentservice.enums.ContractType;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderListDto implements Serializable {
    private Long id;
    private Long stockId;
    private int count; // 주식 수량
    private ContractType orderType; // "BUY" or "SELL"
}
