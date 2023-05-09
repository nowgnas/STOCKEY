package kr.stockey.investmentservice.api.request;
import kr.stockey.investmentservice.enums.ContractType;
import kr.stockey.investmentservice.enums.InvCategory;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.time.LocalDateTime;

@Builder
@Getter
public class OrderRequest {
    @Min(value = -1, message = "Number must be greater than -1")
    @NotNull
    private final Long stockId;
    @Min(value = -1, message = "Number must be greater than -1")
    @NotNull
    private final Integer count; // 주식 수량
    @Pattern(regexp = "BUY|SELL")
    @NotNull
    private final ContractType orderType; // BUY or SELL
}
