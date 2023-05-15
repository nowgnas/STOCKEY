package kr.stockey.stockservice.dto;


import lombok.Data;

import java.time.LocalDate;

@Data
public class KeywordCountDateDto {
    private LocalDate statisticDate;
    private Long count;

}
