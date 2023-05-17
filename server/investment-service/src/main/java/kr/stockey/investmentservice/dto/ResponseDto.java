package kr.stockey.investmentservice.dto;

import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class ResponseDto {
    private String message;
    private Object data;
}
