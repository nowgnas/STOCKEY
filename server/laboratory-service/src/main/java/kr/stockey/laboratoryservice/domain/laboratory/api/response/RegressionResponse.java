package kr.stockey.laboratoryservice.domain.laboratory.api.response;

import kr.stockey.laboratoryservice.domain.keyword.dto.GraphDataDto;
import kr.stockey.laboratoryservice.domain.keyword.dto.RegressionDto;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class RegressionResponse {
    private List<GraphDataDto> graphDataDto;
    private Double constant;
    private List<RegressionDto> regressionDto;

    @Builder
    public RegressionResponse(List<GraphDataDto> graphDataDto, Double constant, List<RegressionDto> regressionDto) {
        this.graphDataDto = graphDataDto;
        this.constant = constant;
        this.regressionDto = regressionDto;
    }
}
