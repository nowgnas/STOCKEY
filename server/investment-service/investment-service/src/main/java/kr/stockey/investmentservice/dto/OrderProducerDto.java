package kr.stockey.investmentservice.dto;

import kr.stockey.investmentservice.enums.ContractType;
import kr.stockey.investmentservice.enums.InvCategory;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderProducerDto implements Serializable {
    private Long memberId;
    private List<OrderListDto> orders;
    private LocalDateTime orderTime;
}
