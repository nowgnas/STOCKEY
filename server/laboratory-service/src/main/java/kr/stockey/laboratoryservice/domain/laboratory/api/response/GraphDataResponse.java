package kr.stockey.laboratoryservice.domain.laboratory.api.response;

import kr.stockey.laboratoryservice.domain.keyword.dto.GraphDataDto;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GraphDataResponse {
    List<GraphDataDto> data;

    @Builder
    public GraphDataResponse(List<GraphDataDto> data) {
        this.data = data;
    }
}
