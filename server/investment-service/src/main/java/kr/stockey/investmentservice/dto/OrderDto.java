package kr.stockey.investmentservice.dto;

import kr.stockey.investmentservice.enums.InvCategory;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class OrderDto {
    private final Long id;
    private final Long memberId;
    private final Long stockId;
    private final int count;
    private final String contractType;
    private final LocalDateTime createdAt;
    private final InvCategory category;
    private final Long matchOrderId;
}
