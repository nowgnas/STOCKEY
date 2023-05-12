package kr.stockey.favoriteservice.dto.core;

import lombok.Builder;
import lombok.Getter;


@Getter
@Builder
public class FavoriteDto {
    private Long id;
    private Long memberId;
    private Long stockId;
    private Long industryId;
    private Long keywordId;

}
