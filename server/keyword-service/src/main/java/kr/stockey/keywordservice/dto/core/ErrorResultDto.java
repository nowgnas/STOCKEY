package kr.stockey.keywordservice.dto.core;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ErrorResultDto {
    String field;
    String message;
}