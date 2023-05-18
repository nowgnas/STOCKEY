package kr.stockey.stockservice.dto.core;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Builder
@Schema(description = "관심 dto")
@Setter
@NoArgsConstructor
public class FavoriteDto {
    @Schema(description = "관심 id", example = "10")
    private Long id;

    @Schema(description = "관심 id", example = "10")
    private String userId;

    @Schema(description = "주식 id", example = "10")
    private Long stockId;

    @Schema(description = "산업 id", example = "10")
    private Long industryId;

    @Schema(description = "키워드 id", example = "10")
    private Long keywordId;

    public FavoriteDto(Long id, String userId, Long stockId, Long industryId, Long keywordId) {
        this.id = id;
        this.userId = userId;
        this.stockId = stockId;
        this.industryId = industryId;
        this.keywordId = keywordId;
    }
}