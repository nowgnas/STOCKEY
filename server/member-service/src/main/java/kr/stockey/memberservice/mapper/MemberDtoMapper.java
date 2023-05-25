package kr.stockey.memberservice.mapper;

import kr.stockey.memberservice.api.response.MemberResponse;
import kr.stockey.memberservice.dto.MemberDto;
import kr.stockey.memberservice.dto.OauthMemberDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MemberDtoMapper {
    MemberDto toMemberDto(OauthMemberDto dto);

    MemberResponse toGetMemberResponse(MemberDto dto);
}
