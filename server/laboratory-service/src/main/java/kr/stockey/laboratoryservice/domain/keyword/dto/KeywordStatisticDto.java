package kr.stockey.laboratoryservice.domain.keyword.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class KeywordStatisticDto {
    private LocalDate statisticDate;
    private Long count;

    @Builder
    public KeywordStatisticDto(LocalDate statisticDate, Long count) {
        this.statisticDate = statisticDate;
        this.count = count;
    }
}
