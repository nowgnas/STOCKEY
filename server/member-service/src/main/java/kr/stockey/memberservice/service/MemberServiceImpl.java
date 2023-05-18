package kr.stockey.memberservice.service;

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
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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
    public MemberDto getMember(String memberId) {
        Long id = Long.parseLong(memberId);
        return getMember(id);
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
//        checkDuplicatedNickname(nickname);

        // 회원 등록
        Member member = Member.oAuthBuilder()
                .nickname(nickname)
                .oAuthId(oAuthId)
                .oAuthType(oauthType)
                .build();
        memberRepository.save(member);
    }


    private MemberDto getMemberDtoByJwtToken() {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        String StringId = request.getHeader("X-UserId");
        System.out.println(StringId);
        long memberId = Long.parseLong(StringId);
        return MemberDto.builder().id(memberId).build();
    }


    @Override
    @Transactional
    public void deleteMember() {
        long memberId = getMemberDtoByJwtToken().getId();
        memberRepository.deleteById(memberId);
    }

    @Override
    public Map<Long, String> getWholeMemberInfo() {
        Map<Long, String> result = new HashMap<>();
        List<Member> members = memberRepository.findAll();
        for(Member m : members){
            result.put(m.getId(), m.getNickname());
        }
        return result;
    }
}
