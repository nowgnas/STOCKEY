package kr.stockey.investmentservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderStatusDto {
    private Long buy;
    private Long sell;
}
