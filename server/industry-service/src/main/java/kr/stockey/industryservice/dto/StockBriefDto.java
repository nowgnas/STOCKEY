package kr.stockey.industryservice.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@Schema(description = "주식 시가총액 dto")
public class StockBriefDto {
    Long id;
    String name;
    Long marketCap;
}
