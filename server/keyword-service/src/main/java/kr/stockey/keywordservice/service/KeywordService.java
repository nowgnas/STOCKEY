package kr.stockey.keywordservice.service;

import kr.stockey.keywordservice.api.request.GetKeyphraseRequest;
import kr.stockey.keywordservice.api.request.GetTopNKeywordRequest;
import kr.stockey.keywordservice.dto.GetKeyPhraseResponse;
import kr.stockey.keywordservice.dto.KeywordDto;
import kr.stockey.keywordservice.dto.KeywordStatisticDto;
import kr.stockey.keywordservice.dto.TopKeywordDTO;
import kr.stockey.keywordservice.dto.core.MemberDto;

import java.util.List;

public interface KeywordService {
    KeywordDto getKeywordDetail(Long keywordsId);

    List<KeywordStatisticDto> getKeywordFreq(Long keywordsId);

    List<KeywordDto> getMyKeywords(MemberDto memberDto);

    boolean checkFavorite(MemberDto memberDto, Long id);

    void addFavorite(MemberDto memberDto,Long id);

    void deleteFavorite(MemberDto memberDto,Long id);

    Long getTargetNewsCount(GetTopNKeywordRequest getTopNKeywordRequest);

    List<TopKeywordDTO> getTopNKeyword(GetTopNKeywordRequest getTopNKeywordRequest);

    List<GetKeyPhraseResponse.Message> getKeyphrase(Long keywordId, GetKeyphraseRequest getKeyphraseRequest);

    List<KeywordDto> getSearchKeyword(String name);

}
