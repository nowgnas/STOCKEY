package kr.stockey.investmentservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MemberOrderDto {
    private Long memberId;
    private List<OrderListDto> orders;
    private LocalDateTime orderTime;
}
