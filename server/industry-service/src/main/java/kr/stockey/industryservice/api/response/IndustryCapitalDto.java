package kr.stockey.industryservice.api.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Schema(description = "산업 dto")
@Builder
@Getter
@AllArgsConstructor
public class IndustryCapitalDto {
    Long id;
    String name;
    Long sum;

}
