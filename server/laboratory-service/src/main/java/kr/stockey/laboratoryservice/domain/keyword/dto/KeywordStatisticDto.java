package kr.stockey.laboratoryservice.domain.keyword.dto;

import java.time.LocalDate;

public interface KeywordStatisticDto {
    LocalDate getStatisticDate();
    Long getCount();
}
