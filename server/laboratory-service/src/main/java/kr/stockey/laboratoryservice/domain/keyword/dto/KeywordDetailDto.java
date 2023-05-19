package kr.stockey.laboratoryservice.domain.keyword.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KeywordDetailDto {
    private final String name;
    private final String description;

    @Builder
    public KeywordDetailDto(String name, String description) {
        this.name = name;
        this.description = description;
    }
}
