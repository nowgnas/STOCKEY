package kr.stockey.keywordservice.redis;

import kr.stockey.keywordservice.dto.KeyphraseResponseMessageDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;
import java.util.List;

@RedisHash(value = "KeyphraseResult", timeToLive = 100)
@Getter
@ToString
@AllArgsConstructor
public class KeyphraseResult implements Serializable{
    @Id
    private Long memberId;
    private List<KeyphraseResponseMessageDto> messages;
}