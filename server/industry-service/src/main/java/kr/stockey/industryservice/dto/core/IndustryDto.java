package kr.stockey.industryservice.dto.core;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Schema(description = "산업 dto")
@NoArgsConstructor
@Setter
public class IndustryDto {

    @Schema(description = "산업 id",example = "10")
    private Long id;

    @Schema(description = "산업명",example = "소프트웨어와서비스")
    private String name;

    @Schema(description = "산업 설명")
    private String description;

    @Schema(description = "대분류",example = "IT" )
    private String category;

}
