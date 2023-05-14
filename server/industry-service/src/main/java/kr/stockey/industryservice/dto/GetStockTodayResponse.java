package kr.stockey.industryservice.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@Schema(description = "종목 현재가")
public class GetStockTodayResponse {
    @Schema(description = "종목 id")
    Long id;
    @Schema(description = "종목명")
    String name;
    @Schema(description = "현재 가격")
    Integer price;
    @Schema(description = "변화율")
    Float rate;
}
