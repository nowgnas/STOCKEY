package kr.stockey.keywordservice.dto.core;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Builder
@Getter
@ToString
public class MemberDto {
    private final Long id;
    private final String nickname;

    private final String userId;
}