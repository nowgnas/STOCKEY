package kr.stockey.newsservice.api.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Schema(description = "특정 주제 뉴스의 Top N 빈도수에 해당하는 키워드를 뽑는 요청 파라미터")
@Builder
@Getter
public class NewsCountRequest {

    @Schema(description = "뉴스 타입",example = "INDUSTRY, ECONOMY, STOCK")
    @NotNull(message = "뉴스 타입은 null 일 수 없습니다.")
    @NotEmpty(message = "뉴스 타입은 1글자~10글자로 입력해주세요.")
    @Size(min = 1, max = 10, message = "검색어는 1글자~10글자로 입력해주세요.")
    private final String newsType;

    @Schema(description = "특정 도메인 ID(ex, STOCK 중 네이버 종목의 ID)",example = "네이버일때 85, ECONOMY 일때는 -1 주기")
    @NotNull(message = "뉴스 타입은 null 일 수 없습니다.")
    private final Long id;

    @Schema(description = "시작 날짜 (yyMMdd)",example = "221002")
    @NotNull(message = "시작 날짜는 null 일 수 없습니다.")
    @DateTimeFormat(pattern = "yyMMdd")
    private final LocalDate startDate;

    @Schema(description = "종료 날짜 (yyMMdd)",example = "221103")
    @NotNull(message = "종료 날짜는 null 일 수 없습니다.")
    @DateTimeFormat(pattern = "yyMMdd")
    private final LocalDate endDate;

}
