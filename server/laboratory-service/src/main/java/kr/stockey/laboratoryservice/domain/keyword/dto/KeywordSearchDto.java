package kr.stockey.laboratoryservice.domain.keyword.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class KeywordSearchDto {
    private final Long id;
    private final String name;

}
