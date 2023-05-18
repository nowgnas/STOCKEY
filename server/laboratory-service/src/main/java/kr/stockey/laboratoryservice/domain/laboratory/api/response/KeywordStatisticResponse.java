package kr.stockey.laboratoryservice.domain.laboratory.api.response;

import kr.stockey.laboratoryservice.domain.keyword.dto.KeywordStatisticDto;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class KeywordStatisticResponse {
    private List<KeywordStatisticDto> list;

    @Builder
    public KeywordStatisticResponse(List<KeywordStatisticDto> list) {
        this.list = list;
    }
}
