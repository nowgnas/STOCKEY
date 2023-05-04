package kr.stockey.memberservice.mapper;


import kr.stockey.memberservice.dto.MemberDto;
import kr.stockey.memberservice.dto.OauthMemberDto;
import kr.stockey.memberservice.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;


@Mapper(componentModel = "spring")
public interface MemberMapper {
    MemberDto toDto(Member member);
    @Mapping(source = "oauthId", target = "oauthMemberId")
    OauthMemberDto toAuthDto(Member member);
}
