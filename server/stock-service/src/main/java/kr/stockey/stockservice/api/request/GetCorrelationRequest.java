package kr.stockey.stockservice.api.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Schema(description = "키워드와 주가의 상관관계를 얻는 request")
@Builder
@Getter
public class GetCorrelationRequest {

    @Schema
    @NotNull(message = "keyword는 null이 될 수 없습니다.")
    private Long keywordId;

    @Schema(description = "시작 날짜 (yyMMdd)",example = "221002")
    @NotNull(message = "시작 날짜는 null 일 수 없습니다.")
    @DateTimeFormat(pattern = "yyMMdd")
    private final LocalDate startDate;

    @Schema(description = "종료 날짜 (yyMMdd)",example = "221103")
    @NotNull(message = "종료 날짜는 null 일 수 없습니다.")
    @DateTimeFormat(pattern = "yyMMdd")
    private final LocalDate endDate;
}
