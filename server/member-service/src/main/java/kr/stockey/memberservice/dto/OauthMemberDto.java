package kr.stockey.memberservice.dto;

import kr.stockey.memberservice.enums.OauthType;
import lombok.Builder;
import lombok.Getter;


@Builder
@Getter
public class OauthMemberDto {
    private final Long id;
    private final Long oauthMemberId;
    private final String nickname;
    private final OauthType oauthType;
}
