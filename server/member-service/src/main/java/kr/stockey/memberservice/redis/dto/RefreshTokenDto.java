package kr.stockey.memberservice.redis.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class RefreshTokenDto {
    private final String refreshToken;
    private final long memberId;
}
