package kr.stockey.keywordservice.mapper;

import kr.stockey.keywordservice.api.response.KeywordDetailResponse;
import kr.stockey.keywordservice.api.response.KeywordResponse;
import kr.stockey.keywordservice.api.response.KeywordSearchResponse;
import kr.stockey.keywordservice.dto.GetKeyPhraseResponse;
import kr.stockey.keywordservice.dto.KeyphraseResponseMessageDto;
import kr.stockey.keywordservice.dto.core.KeywordDto;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface KeywordDtoMapper {
    KeywordDetailResponse toKeywordDetailResponse(KeywordDto keywordDto);
    List<KeywordResponse> toKeywordResponse(List<KeywordDto> keywordDto);

    List<KeywordSearchResponse> toKeywordSearchResponse(List<KeywordDto> keywordDto);

    List<KeyphraseResponseMessageDto> toKeyphraseResponseMessageDtoList(List<GetKeyPhraseResponse.Message> dto);
}
