package kr.stockey.investmentservice.dto;

import java.time.LocalDateTime;

public class OrderDto {
    private Long id;
    private Long memberId;
    private Long stockId;
    private int count; // 주식 수량
    private String orderType; // "BUY" or "SELL"
    private LocalDateTime orderTime;
}
