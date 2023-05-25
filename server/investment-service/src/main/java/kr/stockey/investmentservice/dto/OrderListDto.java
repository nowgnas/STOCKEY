package kr.stockey.investmentservice.dto;

import kr.stockey.investmentservice.enums.ContractType;
import lombok.*;

import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@ToString
public class OrderListDto implements Serializable {
    private Long id;
    private Long stockId;
    private Integer count; // 주식 수량
    private ContractType orderType; // "BUY" or "SELL"
}
