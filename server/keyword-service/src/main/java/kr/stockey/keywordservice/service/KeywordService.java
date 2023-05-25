package kr.stockey.keywordservice.service;

import kr.stockey.keywordservice.api.request.GetKeyphraseRequest;
import kr.stockey.keywordservice.api.request.GetTopNKeywordRequest;
import kr.stockey.keywordservice.dto.*;
import kr.stockey.keywordservice.dto.core.KeywordDto;
import kr.stockey.keywordservice.dto.core.MemberDto;

import java.time.LocalDate;
import java.util.List;

public interface KeywordService {
    KeywordDto getKeywordDetail(Long keywordsId);

    List<KeywordStatisticDto> getKeywordFreq(Long keywordsId);

    List<KeywordDto> getMyKeywords(MemberDto memberDto);

    boolean checkFavorite(Long memberId,Long id);

    void addFavorite(MemberDto memberDto,Long id);

    void deleteFavorite(MemberDto memberDto,Long id);

    Long getTargetNewsCount(GetTopNKeywordRequest getTopNKeywordRequest);

    List<TopKeywordDTO> getTopNKeyword(GetTopNKeywordRequest getTopNKeywordRequest);

    List<KeywordDto> getSearchKeyword(String name);

    List<KeywordStatisticDto> getCountDate(Long keywordId, LocalDate startDate, LocalDate endDate);

    void setKeyphraseRequestToTopic(KeyphraseRequestDto keyphraseRequestDto);

    List<KeyphraseResponseMessageDto> pollKeyphraseData(Long memberId);
}
