package kr.stockey.memberservice.api;


import kr.stockey.memberservice.api.request.SetMemberNicknameRequest;
import kr.stockey.memberservice.api.response.KakaoLoginResponse;
import kr.stockey.memberservice.dto.MemberDto;
import kr.stockey.memberservice.dto.OauthMemberDto;
import kr.stockey.memberservice.dto.ResponseDto;
import kr.stockey.memberservice.enums.NicknameType;
import kr.stockey.memberservice.enums.OauthType;
import kr.stockey.memberservice.exception.member.MemberException;
import kr.stockey.memberservice.exception.member.MemberExceptionType;
import kr.stockey.memberservice.mapper.MemberDtoMapper;
import kr.stockey.memberservice.service.AuthService;
import kr.stockey.memberservice.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final AuthService oAuthService;
    private final MemberService memberService;
    private final MemberDtoMapper memberDtoMapper;


    // 카카오로 로그인/회원가입 수행
    @GetMapping("/login/kakao")
    public ResponseEntity<ResponseDto> kakaoLogin(@RequestParam String code) {
        // 클라이언트에게 받은 code로 AccessToken 생성
        String kakaoAccessToken = oAuthService.getKakaoAccessToken(code);
        // 생성한 AccessToken으로 인증서버로부터 유저 정보 가져오기
        OauthMemberDto oAuthMemberDto = oAuthService.getKakaoMemberInfo(kakaoAccessToken);
        // 기존에 등록된 정보가 있는지 우리 db 조회
        Optional<OauthMemberDto> oauthMemberDtoOptional = memberService.getMember(oAuthMemberDto.getOauthMemberId(), OauthType.KAKAO);

        if (oauthMemberDtoOptional.isEmpty()) {
            // 신규 회원 등록
            memberService.saveMember(oAuthMemberDto.getOauthMemberId(), NicknameType.NONAMED.toString(), OauthType.KAKAO);
            // db에 해당 kakao oAuth의 id를 가진 레코드가 없다면 -> 회원 가입
            return new ResponseEntity<>(getOauthMemberRespDto(oAuthMemberDto.getOauthMemberId()), HttpStatus.CREATED);
        } else if (oauthMemberDtoOptional.get().getNickname().equals(NicknameType.NONAMED.toString())) {
            // if 닉네임이 아직도 NONAME이면 위랑 상태코드 똑같이 해서 닉네임 받는 페이지 가도록
            return new ResponseEntity<>(getOauthMemberRespDto(oAuthMemberDto.getOauthMemberId()), HttpStatus.CREATED);
        }

        // JWT token 생성 및 리턴
        String accessToken = oAuthService.createJwt(memberDtoMapper.toMemberDto(oauthMemberDtoOptional.get()));
        KakaoLoginResponse kakaoLoginResponse = new KakaoLoginResponse(accessToken);
        return new ResponseEntity<>(new ResponseDto("로그인 완료!", kakaoLoginResponse), HttpStatus.OK);
    }


    //  "회원가입 후 기본 닉네임(NONAMED)을 변경"
    @PutMapping("/nickname")
    public ResponseEntity<ResponseDto> setMemberNickname(
            @Valid @RequestBody SetMemberNicknameRequest setMemberNicknameRequest) {
        // 가입된 회원 정보 가져오기
        MemberDto memberDto = memberDtoMapper.toMemberDto(memberService
                .getMember(setMemberNicknameRequest.getOauthId(), OauthType.valueOf(setMemberNicknameRequest.getOauthType()))
                .orElseThrow(() -> new MemberException(MemberExceptionType.NOT_FOUND_MEMBER)));
        // 닉네임 변경
        String changedNickname = memberService.changeNickname(memberDto, setMemberNicknameRequest.getNickname());
        // 새로운 memberDto 생성
        MemberDto newMemberDto = MemberDto.builder().id(memberDto.getId()).nickname(changedNickname).build();
        // JWT token 생성 및 리턴
        String accessToken = oAuthService.createJwt(newMemberDto);
        return new ResponseEntity<>(new ResponseDto("로그인 완료!", new KakaoLoginResponse(accessToken)), HttpStatus.OK);
    }


    //  "Access token을 Refresh token을 통해 refresh"
    @GetMapping("/refresh")
    public ResponseEntity<ResponseDto> tokenRefresh() {
        String accessToken = oAuthService.tokenRefresh();
        return new ResponseEntity<>(new ResponseDto("token refresh 완료!", accessToken), HttpStatus.OK);
    }


    // "Logout"
    @PostMapping("/logout")
    public ResponseEntity<ResponseDto> logout() {
        oAuthService.logout();
        return new ResponseEntity<>(new ResponseDto("logout 완료!", null), HttpStatus.OK);
    }


    private ResponseDto getOauthMemberRespDto(long oauthMemberId) {
        OauthMemberDto oauthMemberDto = OauthMemberDto.builder()
                .nickname(NicknameType.NONAMED.toString())
                .oauthMemberId(oauthMemberId)
                .oauthType(OauthType.KAKAO)
                .build();
        return new ResponseDto("닉네임 변경 필요!", oauthMemberDto);
    }
}
