package kr.stockey.laboratoryservice.domain.laboratory.api.response;

import kr.stockey.laboratoryservice.domain.keyword.dto.RegressionDto;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class RegressionResponse {
    private Double constant;
    List<RegressionDto> coefficients;

    @Builder
    public RegressionResponse(Double constant, List<RegressionDto> coefficients) {
        this.constant = constant;
        this.coefficients = coefficients;
    }
}
