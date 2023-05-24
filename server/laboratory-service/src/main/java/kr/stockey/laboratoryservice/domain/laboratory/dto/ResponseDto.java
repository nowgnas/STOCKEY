package kr.stockey.laboratoryservice.domain.laboratory.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class ResponseDto {
    private final String message;
    private final Object data;

    @Builder
    public ResponseDto(String message, Object data) {
        this.message = message;
        this.data = data;
    }
}
