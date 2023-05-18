package kr.stockey.keywordservice.service;

import kr.stockey.keywordservice.api.request.GetKeyphraseRequest;
import kr.stockey.keywordservice.api.request.GetTopNKeywordRequest;
import kr.stockey.keywordservice.api.request.NewsCountRequest;
import kr.stockey.keywordservice.client.FavoriteClient;
import kr.stockey.keywordservice.client.NewsClient;
import kr.stockey.keywordservice.dto.GetKeyPhraseResponse;
import kr.stockey.keywordservice.dto.KeywordStatisticDto;
import kr.stockey.keywordservice.dto.TopKeywordCountDto;
import kr.stockey.keywordservice.dto.TopKeywordDTO;
import kr.stockey.keywordservice.dto.core.FavoriteDto;
import kr.stockey.keywordservice.dto.core.KeywordDto;
import kr.stockey.keywordservice.dto.core.MemberDto;
import kr.stockey.keywordservice.entity.Keyword;
import kr.stockey.keywordservice.exception.favorite.FavoriteException;
import kr.stockey.keywordservice.exception.favorite.FavoriteExceptionType;
import kr.stockey.keywordservice.exception.keyword.KeywordException;
import kr.stockey.keywordservice.exception.keyword.KeywordExceptionType;
import kr.stockey.keywordservice.mapper.KeywordMapper;
import kr.stockey.keywordservice.repository.KeywordRepository;
import kr.stockey.keywordservice.repository.KeywordStatisticRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class KeywordServiceImpl implements KeywordService {
    @Value("${django.url}")
    private String djangoUrl;
    @Value("${django.port}")
    private String djangoPort;


    private final KeywordMapper keywordMapper;
    private final KeywordRepository keywordRepository;
    private final KeywordStatisticRepository keywordStatisticRepository;
    private final FavoriteClient favoriteClient;
    private final NewsClient newsClient;


    @Override
    public KeywordDto getKeywordDetail(Long keywordsId) {
        Keyword keyword = keywordRepository.findById(keywordsId).orElseThrow(()
                -> new KeywordException(KeywordExceptionType.KEYWORD_NOT_EXIST));
        return keywordMapper.toDto(keyword);
    }

    @Override
    public List<KeywordStatisticDto> getKeywordFreq(Long keywordsId) {
        return keywordStatisticRepository.findFreqStatisticsByKeywordId(keywordsId);
    }

    @Override
    public List<KeywordDto> getMyKeywords(MemberDto memberDto) {
        // 내 관심 키워드들
        List<FavoriteDto> myFavoriteKeyword = favoriteClient.getMyFavoriteKeyword(memberDto.getId());
        List<KeywordDto> keywordDtoList = new ArrayList<>();

        // 관심 키워드 ID -> 키워드 entity => dto
        myFavoriteKeyword.forEach(v -> {
            Long keywordId = v.getKeywordId();
            Keyword keyword = keywordRepository.findById(keywordId).orElseThrow(
                    () -> new KeywordException(KeywordExceptionType.KEYWORD_NOT_EXIST));
            KeywordDto keywordDto = keywordMapper.toDto(keyword);
            keywordDtoList.add(keywordDto);
        });
        return keywordDtoList;
    }

    @Override
    public boolean checkFavorite(Long memberId,Long id) {
        return favoriteClient.checkFavoriteKeyword(memberId,id);
    }

    @Override
    @Transactional
    public void addFavorite(MemberDto memberDto,Long id) {
        Keyword keyword = keywordRepository.findById(id).orElseThrow(()
                -> new KeywordException(KeywordExceptionType.KEYWORD_NOT_EXIST));
        // 이미 관심 등록 했다면
        if (checkFavorite(memberDto.getId(),id)) {
            throw new FavoriteException(FavoriteExceptionType.ALREADY_EXIST);
        }
        favoriteClient.createFavoriteKeyword(memberDto.getId(),id);
    }

    @Override
    public void deleteFavorite(MemberDto memberDto,Long id) {
        keywordRepository.findById(id).orElseThrow(()
                -> new KeywordException(KeywordExceptionType.KEYWORD_NOT_EXIST));
        boolean isFavorite = checkFavorite(memberDto.getId(),id);
        // 관심 등록하지 않았다면
        if (!isFavorite) {
            throw new FavoriteException(FavoriteExceptionType.NOT_FOUND);
        }
        favoriteClient.deleteFavoriteKeyword(memberDto.getId(),id);
    }

    @Override
    public Long getTargetNewsCount(GetTopNKeywordRequest getTopNKeywordRequest) {
        NewsCountRequest request = new ModelMapper().map(getTopNKeywordRequest, NewsCountRequest.class);
        return newsClient.getNewsCountByDomain(request);
    }


    // TopN 키워드 리턴
    @Override
    public List<TopKeywordDTO> getTopNKeyword(GetTopNKeywordRequest getTopNKeywordRequest) {
        List<TopKeywordCountDto> topKeywordCount = newsClient.getTopNKeywords(getTopNKeywordRequest);
        // keyword의 name 필드 추가
        List<TopKeywordDTO> topKeywords = topKeywordCount.stream()
                .map(o -> {
                    Keyword keyword = keywordRepository.findById(o.getKeywordId())
                            .orElseThrow(() -> new KeywordException(KeywordExceptionType.KEYWORD_NOT_EXIST));
                    return new TopKeywordDTO(o.getKeywordId(), o.getKeywordCount(), keyword.getName());
                })
                .collect(Collectors.toList());
        return topKeywords;
    }

    @Override
    public List<GetKeyPhraseResponse.Message> getKeyphrase(Long keywordId, GetKeyphraseRequest getKeyphraseRequest) {

        LocalDate startDate = getKeyphraseRequest.getStartDate();
        LocalDate endDate = getKeyphraseRequest.getEndDate();
        Long id = getKeyphraseRequest.getId();
        String newsType = getKeyphraseRequest.getNewsType();
        // LocalDate => String 형식으로 변환
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyMMdd");
        String startDateString = startDate.format(formatter);
        String endDateString = endDate.format(formatter);

        // SpringBoot -> DjangoServer 데이터 요청
        RestTemplate restTemplate = new RestTemplate();
        String url = djangoUrl + ":" + djangoPort + "/keywords/{keywordId}/keyphrase?";
        String queryUrl = UriComponentsBuilder.fromUriString(url)
                .queryParam("type", newsType)
                .queryParam("id", id)
                .queryParam("start_date", startDateString)
                .queryParam("end_date", endDateString)
                .buildAndExpand(keywordId)
                .toUriString();
        ResponseEntity<GetKeyPhraseResponse> response = restTemplate.exchange(queryUrl, HttpMethod.GET, null, new ParameterizedTypeReference<GetKeyPhraseResponse>() {
        });
        GetKeyPhraseResponse Returns = response.getBody();
        return Returns.getMessages();
    }

    @Override
    public List<KeywordDto> getSearchKeyword(String name) {
        List<Keyword> keywordList = keywordRepository.findTop10ByNameStartingWith(name);
        return keywordMapper.toDto(keywordList);
    }

    @Override
    public List<KeywordStatisticDto> getCountDate(Long keywordId, LocalDate startDate, LocalDate endDate) {
        keywordRepository.findById(keywordId).orElseThrow(()
                -> new KeywordException(KeywordExceptionType.KEYWORD_NOT_EXIST));
        return keywordStatisticRepository.getCountDate(keywordId, startDate, endDate);
    }
}

