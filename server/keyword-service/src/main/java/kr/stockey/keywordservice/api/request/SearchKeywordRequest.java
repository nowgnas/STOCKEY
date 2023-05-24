package kr.stockey.keywordservice.api.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Schema(description = "키워드 검색 dto")
@Builder
@Getter
public class SearchKeywordRequest {
    @Schema(description = "검색 키워드",example = "삼성")
    @NotNull(message = "검색어는 null일 수 없습니다.")
    @NotEmpty(message = "검색어는 1글자~10글자로 입력해주세요.")
    @Size(min = 1, max = 10, message = "검색어는 1글자~10글자로 입력해주세요.")
    private final String searchKeyword;
}
