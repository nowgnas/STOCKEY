package kr.stockey.keywordservice.mapper;

import kr.stockey.keywordservice.dto.core.KeywordDto;
import kr.stockey.keywordservice.entity.Keyword;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface KeywordMapper {
    KeywordDto toDto(Keyword keyword);

    List<KeywordDto> toDto(List<Keyword> keywordList);
}
