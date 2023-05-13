package kr.stockey.keywordservice.service;

import kr.stockey.keywordservice.api.request.GetKeyphraseRequest;
import kr.stockey.keywordservice.api.request.GetTopNKeywordRequest;
import kr.stockey.keywordservice.client.FavoriteClient;
import kr.stockey.keywordservice.dto.GetKeyPhraseResponse;
import kr.stockey.keywordservice.dto.KeywordStatisticDto;
import kr.stockey.keywordservice.dto.TopKeywordDTO;
import kr.stockey.keywordservice.dto.core.FavoriteDto;
import kr.stockey.keywordservice.dto.core.KeywordDto;
import kr.stockey.keywordservice.entity.Keyword;
import kr.stockey.keywordservice.exception.favorite.FavoriteException;
import kr.stockey.keywordservice.exception.favorite.FavoriteExceptionType;
import kr.stockey.keywordservice.exception.keyword.KeywordException;
import kr.stockey.keywordservice.exception.keyword.KeywordExceptionType;
import kr.stockey.keywordservice.mapper.KeywordMapper;
import kr.stockey.keywordservice.repository.KeywordRepository;
import kr.stockey.keywordservice.repository.KeywordStatisticRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class KeywordServiceImpl implements KeywordService{
    @Value("${django.url}")
    private String djangoUrl;
    @Value("${django.port}")
    private String djangoPort;


    private final KeywordMapper keywordMapper;
    private final KeywordRepository keywordRepository;
    private final KeywordStatisticRepository keywordStatisticRepository;
    private final FavoriteClient favoriteClient;
    private final MemberService memberService;
    private final NewsRelationRepository newsRelationRepository;




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
    public List<KeywordDto> getMyKeywords() {
        // 내 관심 키워드들
        List<FavoriteDto> myFavoriteKeyword = (List<FavoriteDto>)favoriteClient.getMyFavoriteKeyword().getData();
        List<KeywordDto> keywordDtoList = new ArrayList<>();

        // 관심 키워드 ID -> 키워드 entity => dto
        myFavoriteKeyword.forEach(v ->{
            Long keywordId = v.getKeywordId();
            Keyword keyword = keywordRepository.findById(keywordId).orElseThrow(
                    () -> new KeywordException(KeywordExceptionType.KEYWORD_NOT_EXIST));
            KeywordDto keywordDto = keywordMapper.toDto(keyword);
            keywordDtoList.add(keywordDto);
        });
        return keywordDtoList;
    }

    @Override
    public boolean checkFavorite(Long id) {
        boolean result = (boolean) favoriteClient.checkFavoriteKeyword(id).getData();
        return result;
    }

    @Override
    @Transactional
    public void addFavorite(Long id) {
        Keyword keyword = keywordRepository.findById(id).orElseThrow(()
                -> new KeywordException(KeywordExceptionType.KEYWORD_NOT_EXIST));
        // 이미 관심 등록 했다면
        if (checkFavorite(keyword.getId())) {
            throw new FavoriteException(FavoriteExceptionType.ALREADY_EXIST);
        }

        Member member = memberService.getMemberEntity();
        Favorite favorite = Favorite.keywordBuilder()
                .member(member)
                .keyword(keyword)
                .build();
        favoriteRepository.save(favorite);
    }

    @Override
    public void deleteFavorite(Long id) {
        Keyword keyword = keywordRepository.findById(id).orElseThrow(()
                -> new KeywordException(KeywordExceptionType.KEYWORD_NOT_EXIST));
        boolean isFavorite = checkFavorite(id);
        // 관심 등록하지 않았다면
        if (!isFavorite) {
            throw new FavoriteException(FavoriteExceptionType.NOT_FOUND);
        }
        Member member = memberService.getMemberEntity();
        Favorite favorite = favoriteRepository.findByMemberAndKeyword(member, keyword);
        checkUser(member, favorite);
        favoriteRepository.delete(favorite);
    }

    @Override
    public Long getTargetNewsCount(GetTopNKeywordRequest getTopNKeywordRequest) {
        String newsType = getTopNKeywordRequest.getNewsType();
        Long domainId = getTopNKeywordRequest.getId();
        LocalDate startDate = getTopNKeywordRequest.getStartDate();
        LocalDate endDate = getTopNKeywordRequest.getEndDate();

        Long totalNewsCount = 0L;

        switch (newsType) {
            case "ECONOMY":
                totalNewsCount = newsRelationRepository.getTotalNewsCountForEconomy(startDate, endDate);
                break;
            case "INDUSTRY":
                totalNewsCount = newsRelationRepository.getTotalNewsCountForIndustry(startDate, endDate, domainId);
                break;
            case "STOCK":
                totalNewsCount = newsRelationRepository.getTotalNewsCountForStock(startDate, endDate, domainId);
                break;
            default:
                break;
        }
        return totalNewsCount;
    }

    @Override
    public List<TopKeywordDTO> getTopNKeyword(GetTopNKeywordRequest getTopNKeywordRequest) {
        Pageable topN = PageRequest.of(0, getTopNKeywordRequest.getTopN());
        String newsType = getTopNKeywordRequest.getNewsType();
        Long domainId = getTopNKeywordRequest.getId();
        LocalDate startDate = getTopNKeywordRequest.getStartDate();
        LocalDate endDate = getTopNKeywordRequest.getEndDate();

        List<TopKeywordDTO> topKeywords = new ArrayList<>();

        switch (newsType) {
            case "ECONOMY":
                topKeywords = newsRelationRepository.getTopNKeywordsForEconomy(startDate, endDate, topN);
                break;
            case "INDUSTRY":
                topKeywords = newsRelationRepository.getTopNKeywordsForIndustry(startDate, endDate, topN, domainId);
                break;
            case "STOCK":
                topKeywords = newsRelationRepository.getTopNKeywordsForStock(startDate, endDate, topN, domainId);
                break;
            default:
                break;
        }
        return topKeywords;
    }

    @Override
    public List<GetKeyPhraseResponse.Message> getKeyphrase(Long keywordId, GetKeyphraseRequest getKeyphraseRequest) {

        LocalDate startDate = getKeyphraseRequest.getStartDate();
        LocalDate endDate = getKeyphraseRequest.getEndDate();
        Long id =  getKeyphraseRequest.getId();
        String newsType = getKeyphraseRequest.getNewsType();
        // LocalDate => String 형식으로 변환
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyMMdd"); 
        String startDateString = startDate.format(formatter);
        String endDateString = endDate.format(formatter);

        // SpringBoot -> DjangoServer 데이터 요청
        RestTemplate restTemplate = new RestTemplate();
        String url = djangoUrl+":"+djangoPort+"/keywords/{keywordId}/keyphrase?";
        String queryUrl = UriComponentsBuilder.fromUriString(url)
                .queryParam("type", newsType)
                .queryParam("id", id)
                .queryParam("start_date", startDateString)
                .queryParam("end_date",endDateString)
                .buildAndExpand(keywordId)
                .toUriString();
        ResponseEntity<GetKeyPhraseResponse> response = restTemplate.exchange(queryUrl, HttpMethod.GET, null, new ParameterizedTypeReference<GetKeyPhraseResponse>() {});
        GetKeyPhraseResponse Returns = response.getBody();
        return Returns.getMessages();
    }

    @Override
    public List<KeywordDto> getSearchKeyword(String name) {
        List<Keyword> keywordList = keywordRepository.findTop10ByNameStartingWith(name);
        return keywordMapper.toDto(keywordList);
    }

    // 유저가 동일한지 체크
    private static void checkUser(Long memberId, Long favoriteId) {
        if (memberId != favoriteId) {
            throw new FavoriteException(FavoriteExceptionType.DIFFERENT_USER);
        }
    }

    // 유저 memberId 가져오기
    private Long getMemberId() {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        String stringId = request.getHeader("X-UserId");
        return Long.parseLong(stringId);
    }


}

