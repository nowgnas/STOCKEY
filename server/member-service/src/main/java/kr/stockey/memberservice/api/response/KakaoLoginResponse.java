package kr.stockey.memberservice.api.response;

import lombok.Data;

@Data
public class KakaoLoginResponse {
    private final String accessToken;
}
