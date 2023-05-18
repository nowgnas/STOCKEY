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
    private List<GraphDataDto> graphData;
    private Double constant;
    private List<RegressionDto> regression;

    @Builder
    public RegressionResponse(List<GraphDataDto> graphData, Double constant, List<RegressionDto> regression) {
        this.graphData = graphData;
        this.constant = constant;
        this.regression = regression;
    }
}
