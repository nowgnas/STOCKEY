package kr.stockey.industryservice.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Builder
@Setter
@Schema(description = "주식 시가총액 dto")
@NoArgsConstructor
public class StockBriefDto {
    Long id;
    String name;
    Long marketCap;

    public StockBriefDto(Long id, String name, Long marketCap) {
        this.id = id;
        this.name = name;
        this.marketCap = marketCap;
    }
}
