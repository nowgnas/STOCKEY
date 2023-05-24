package kr.stockey.laboratoryservice.domain.keyword.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class KeywordSearchDto {
    private final Long id;
    private final String name;

    @Builder
    public KeywordSearchDto(Long id, String name) {
        this.id = id;
        this.name = name;
    }
}
