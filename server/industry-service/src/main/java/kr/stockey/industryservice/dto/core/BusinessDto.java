package kr.stockey.industryservice.dto.core;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class BusinessDto {
    private Long id;
    private String name;
    private String description;
}
