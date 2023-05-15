package kr.stockey.investmentservice.dto;

import kr.stockey.investmentservice.enums.InvCategory;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class OrderDto {
    private Long id;
    private Long memberId;
    private Long stockId;
    private int count;
    private String contractType;
    private LocalDateTime createdAt;
    private InvCategory category;
    private Long matchOrderId;
}
