package kr.stockey.investmentservice.dto;

import kr.stockey.investmentservice.enums.ContractType;
import kr.stockey.investmentservice.enums.InvCategory;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderProducerDto {
    private Long memberId;
    private Long stockId;
    private Integer count; // 주식 수량
    private ContractType orderType; // BUY or SELL
    private InvCategory invCategory; // ORDER, CONTRACT
    private LocalDateTime orderTime;

    public void setOrderTime(LocalDateTime orderTime) {
        this.orderTime = orderTime;
    }
}
