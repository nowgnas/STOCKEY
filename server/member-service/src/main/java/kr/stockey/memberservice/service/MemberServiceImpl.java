package kr.stockey.memberservice.service;

import com.auth0.jwt.interfaces.DecodedJWT;
import kr.stockey.memberservice.dto.MemberDto;
import kr.stockey.memberservice.dto.OauthMemberDto;
import kr.stockey.memberservice.entity.Member;
import kr.stockey.memberservice.enums.OauthType;
import kr.stockey.memberservice.exception.member.MemberException;
import kr.stockey.memberservice.exception.member.MemberExceptionType;
import kr.stockey.memberservice.jwt.JwtUtil;
import kr.stockey.memberservice.mapper.MemberMapper;
import kr.stockey.memberservice.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberMapper memberMapper;
    private final MemberRepository memberRepository;
    private final JwtUtil jwtUtil;


    @Override
    public void checkDuplicatedNickname(String nickName) {
        // 닉네임 조회 후 존재하면 에러 발생 시킴
        memberRepository.findByNickname(nickName).ifPresent(x -> {
            throw new MemberException(MemberExceptionType.ALREADY_EXIST_NICKNAME);
        });
    }



    @Override
    @Transactional
    public String changeNickname(MemberDto memberDto, String newNickname) {
        Member member = memberRepository.findById(memberDto.getId())
                .orElseThrow(() -> new MemberException(MemberExceptionType.NOT_FOUND_MEMBER));
        // 닉네임 중복검사
        checkDuplicatedNickname(newNickname);
        member.setNickname(newNickname);
        return newNickname;
    }

    @Override
    @Transactional
    public void changeNickname(String newNickname) {
        MemberDto memberDto = getMemberDtoByJwtToken();
        Member member = memberRepository.findById(memberDto.getId())
                .orElseThrow(() -> new MemberException(MemberExceptionType.NOT_FOUND_MEMBER));
        // 닉네임 중복검사
        checkDuplicatedNickname(member.getNickname());
        member.setNickname(newNickname);
    }


    @Override
    public Optional<OauthMemberDto> getMember(long oAuthId, OauthType oauthType) {
        Optional<Member> memberOptional = memberRepository.findByOauthIdAndOauthType(oAuthId, oauthType);
        if (memberOptional.isEmpty()) {
            // 가입된 회원이 없다면 null 리턴
            return Optional.empty();
        } else {
            // 가입된 회원이 있다면 회원 정보 리턴
            return Optional.ofNullable(memberMapper.toAuthDto(memberOptional.get()));
        }
    }

    @Override
    public MemberDto getMember(long memberId) {
        Member member = memberRepository
                .findById(memberId)
                .orElseThrow(() -> new MemberException(MemberExceptionType.NOT_FOUND_MEMBER));
        return memberMapper.toDto(member);
    }

    @Override
    public MemberDto getMember() {
        MemberDto memberDto = getMemberDtoByJwtToken();
        Member member = memberRepository
                .findById(memberDto.getId())
                .orElseThrow(() -> new MemberException(MemberExceptionType.NOT_FOUND_MEMBER));
        return memberMapper.toDto(member);
    }

    @Override
    public Member getMemberEntity() {
        MemberDto memberDto = getMemberDtoByJwtToken();
        return memberRepository
                .findById(memberDto.getId())
                .orElseThrow(() -> new MemberException(MemberExceptionType.NOT_FOUND_MEMBER));
    }


    @Override
    @Transactional
    public void saveMember(long oAuthId, String nickname, OauthType oauthType) {
        // 닉네임 중복 화인
        checkDuplicatedNickname(nickname);
        String uuid = UUID.randomUUID().toString();

        // 회원 등록
        Member member = Member.oAuthBuilder()
                .nickname(nickname)
                .oAuthId(oAuthId)
                .oAuthType(oauthType)
                .userId(uuid)
                .build();
        memberRepository.save(member);
    }


    private MemberDto getMemberDtoByJwtToken() {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        String accessToken = request.getHeader("Authorization");
        accessToken = accessToken.substring(7);
        DecodedJWT payload = jwtUtil.getDecodedJWT(accessToken);
        long memberId = Long.parseLong(payload.getAudience().get(0));
        String nickname = String.valueOf(payload.getClaim("nickname"));
        String trimmedNickname = nickname.replaceAll("\"", "");
        return MemberDto.builder().id(memberId).nickname(trimmedNickname).build();
    }


    @Override
    @Transactional
    public void deleteMember() {
        long memberId = getMemberDtoByJwtToken().getId();
        memberRepository.deleteById(memberId);
    }


//    @Override
//    public void addMemberCoin(int addCoinVal) {
//        long memberId = getMemberIdAndNicknameByJwtToken().getId();
//        Optional<MemberCoin> optionalMemberCoin = memberCoinRepository.findByMemberId(memberId);
//        if (optionalMemberCoin.isEmpty()) {
//            throw new MemberException(MemberExceptionType.NOT_FOUND_MEMBER);
//        }
//        int coffeeBeanCount = optionalMemberCoin.get().getCoffeeBeanCount();
//        optionalMemberCoin.get().setCoffeeBeanCount(coffeeBeanCount + addCoinVal);
//    }
//
//    @Override
//    public MemberCoinRespDto getMemberCoin() {
//        MemberCoin memberCoin = memberCoinRepository.findByMemberId(getMemberIdAndNicknameByJwtToken().getId())
//                .orElseThrow(() -> new MemberException(MemberExceptionType.MEMBER_DB_ERR));
//        return MemberCoinRespDto.builder().CoffeeBeanCnt(memberCoin.getCoffeeBeanCount())
//                .CoffeeCnt(memberCoin.getCoffeeCount()).build();
//    }
//
//    @Override
//    public void setHyncholAuth(SuperMemberCafeAuthReqDto superMemberCafeAuthReqDto) {
//        String nickname = getMemberIdAndNicknameByJwtToken().getNickname();
//        if (!nickname.equals("조현철")) {
//            throw new MemberException(MemberExceptionType.HACKING_PREVENT);
//        }
//        CafeAuth cafeAuth = CafeAuth.builder()
//                .cafeId(superMemberCafeAuthReqDto.getCafeId())
//                .nickname(nickname)
//                .expiration(6000000)
//                .build();
//        cafeAuthRepository.save(cafeAuth);
//    }
}
