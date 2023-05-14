package kr.stockey.laboratoryservice.common.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springdoc.core.SpringDocConfiguration;
import org.springframework.context.annotation.Bean;

@OpenAPIDefinition(
        info = @Info(
                title = "Stockey API 명세서",
                description = "API 명세서",
                version = "v1"
        )
)
public class OpenApiConfig {
    @Bean
    public SpringDocConfiguration springDocConfiguration() {
        return new SpringDocConfiguration();
    }
}
