package kr.stockey.keywordservice.dto;

import java.time.LocalDate;

public interface KeywordStatisticDto {
    LocalDate getStatisticDate();
    Long getCount();
}
