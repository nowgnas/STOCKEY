package kr.stockey.laboratoryservice.domain.keyword.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegressionDto {
    private String keyword;
    private Double coefficient;

    @Builder
    public RegressionDto(String keyword, Double coefficient) {
        this.keyword = keyword;
        this.coefficient = coefficient;
    }
}
