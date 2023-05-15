package kr.stockey.stockservice.dto.core;

import kr.stockey.stockservice.entity.Stock;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
public class BusinessDto {
    private Long id;
    private String name;
    private String description;
}
