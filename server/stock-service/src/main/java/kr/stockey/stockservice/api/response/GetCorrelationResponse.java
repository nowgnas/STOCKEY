package kr.stockey.stockservice.api.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GetCorrelationResponse {
    private Double correlationCoefficient;
    private Double pValue;

}
