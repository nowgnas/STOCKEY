package kr.stockey.investmentservice.redis;

import kr.stockey.investmentservice.enums.ContractType;
import kr.stockey.investmentservice.enums.InvCategory;
import org.springframework.data.annotation.Id;

import java.io.Serializable;
import java.time.LocalDateTime;

public class Order implements Serializable {
    private Long memberId;
    private Long stockId;
    private Integer count; // stock quantity
    private ContractType orderType; // BUY or SELL
    private InvCategory invCategory; // ORDER, CONTRACT
    private LocalDateTime orderTime;

    @Id
    public String getKey() {
        return memberId + "_" + orderTime.toString();
    }

    public void setOrderTime(LocalDateTime orderTime) {
        this.orderTime = orderTime;
    }}
