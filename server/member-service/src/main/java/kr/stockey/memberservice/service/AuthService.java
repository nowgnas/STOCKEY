package kr.stockey.memberservice.service;


import kr.stockey.memberservice.dto.MemberDto;
import kr.stockey.memberservice.dto.OauthMemberDto;

public interface AuthService {
    OauthMemberDto getKakaoMemberInfo(String token);
    String getKakaoAccessToken (String code);
    String createJwt(MemberDto memberDto);
    String tokenRefresh();
    void logout();
}
