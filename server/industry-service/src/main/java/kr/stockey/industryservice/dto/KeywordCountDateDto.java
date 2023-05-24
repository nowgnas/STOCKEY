package kr.stockey.stockservice.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Data
@NoArgsConstructor
public class KeywordCountDateDto {
    @DateTimeFormat(pattern = "yyMMdd")
    private LocalDate statisticDate;
    private Long count;

}