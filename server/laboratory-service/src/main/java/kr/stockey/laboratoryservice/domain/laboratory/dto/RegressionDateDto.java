package kr.stockey.laboratoryservice.domain.laboratory.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class RegressionDateDto {
    private LocalDate date;
    private Double price;
    private Integer freq;

    @Builder
    public RegressionDateDto(LocalDate date, Double price, Integer freq) {
        this.date = date;
        this.price = price;
        this.freq = freq;
    }
}
