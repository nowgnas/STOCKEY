package kr.stockey.memberservice.redis;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

// 리프레쉬 토큰 유효 = 10일
@RedisHash(value = "refreshToken", timeToLive = 864000)
@Getter
@AllArgsConstructor
public class RefreshToken {
    @Id
    private String refreshToken;
    private Long memberId;
}