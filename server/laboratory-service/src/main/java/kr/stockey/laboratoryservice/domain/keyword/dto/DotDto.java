package kr.stockey.laboratoryservice.domain.keyword.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DotDto {
    private Integer x;
    private Integer y;

    @Builder
    public DotDto(Integer x, Integer y) {
        this.x = x;
        this.y = y;
    }
}
