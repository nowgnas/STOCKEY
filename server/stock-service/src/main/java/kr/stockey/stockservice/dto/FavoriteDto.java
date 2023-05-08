package kr.stockey.stockservice.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@Schema(description = "관심 dto")
public class FavoriteDto {
    @Schema(description = "관심 id", example = "10")
    private Long id;

    @Schema(description = "관심 id", example = "10")
    private Long userId;

    @Schema(description = "주식 id", example = "10")
    private Long stockId;

    @Schema(description = "산업 id", example = "10")
    private Long industryId;

    @Schema(description = "키워드 id", example = "10")
    private Long keywordId;

}