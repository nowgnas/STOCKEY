package kr.stockey.investmentservice.dto;

import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
public class OrderListDto implements Serializable {
    private Long stockId;
    private int count; // 주식 수량
    private String orderType; // "BUY" or "SELL"
}
