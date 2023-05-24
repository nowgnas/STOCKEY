package kr.stockey.investmentservice.api.request;
import kr.stockey.investmentservice.enums.ContractType;
import kr.stockey.investmentservice.enums.InvCategory;
import lombok.*;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class OrderRequest {
    @Min(value = -1, message = "Number must be greater than -1")
    @NotNull
    private Long stockId;
    @Min(value = -1, message = "Number must be greater than -1")
    @NotNull
    private Integer count; // 주식 수량
    @Pattern(regexp = "BUY|SELL")
    @NotNull
    private ContractType orderType; // BUY or SELL
}
