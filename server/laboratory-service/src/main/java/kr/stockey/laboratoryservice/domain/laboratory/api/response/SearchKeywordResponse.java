package kr.stockey.laboratoryservice.domain.laboratory.api.response;

import kr.stockey.laboratoryservice.domain.keyword.dto.KeywordSearchDto;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class SearchKeywordResponse {
    List<KeywordSearchDto> keywordSearchList;
}
