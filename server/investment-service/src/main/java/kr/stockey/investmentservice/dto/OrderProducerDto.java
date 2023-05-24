package kr.stockey.investmentservice.dto;

import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class OrderProducerDto implements Serializable {
    private Long memberId;
    private List<OrderListDto> orders;
    private LocalDateTime orderTime;
}
