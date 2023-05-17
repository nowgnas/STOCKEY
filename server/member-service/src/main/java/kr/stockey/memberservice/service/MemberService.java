package kr.stockey.memberservice.service;



import kr.stockey.memberservice.dto.MemberDto;
import kr.stockey.memberservice.dto.OauthMemberDto;
import kr.stockey.memberservice.entity.Member;
import kr.stockey.memberservice.enums.OauthType;

import java.util.Map;
import java.util.Optional;

public interface MemberService {
    void checkDuplicatedNickname(String nickName);
    String changeNickname(MemberDto member, String newNickname);
    void changeNickname(String newNickname);
    // 메소드 오버로딩 : 회원가입, 로그인시 사용되는 getMember
    Optional<OauthMemberDto> getMember(long oAuthId, OauthType oAuthType);
    MemberDto getMember(long memberId);
    MemberDto getMember(String memberId);
    MemberDto getMember();
    Member getMemberEntity();
    void saveMember(long oAuthId, String nickname, OauthType oAuthType);
    void deleteMember();

    Map<Long, String> getWholeMemberInfo();
}
