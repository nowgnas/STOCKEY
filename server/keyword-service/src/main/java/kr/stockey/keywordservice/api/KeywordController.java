package kr.stockey.keywordservice.api;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import kr.stockey.keywordservice.api.request.GetKeyphraseRequest;
import kr.stockey.keywordservice.api.request.GetTopNKeywordRequest;
import kr.stockey.keywordservice.api.response.GetTopNKeywordResponse;
import kr.stockey.keywordservice.api.response.KeywordDetailResponse;
import kr.stockey.keywordservice.api.response.KeywordSearchResponse;
import kr.stockey.keywordservice.client.MemberClient;
import kr.stockey.keywordservice.dto.*;
import kr.stockey.keywordservice.dto.core.KeywordDto;
import kr.stockey.keywordservice.dto.core.MemberDto;
import kr.stockey.keywordservice.dto.core.ResponseDto;
import kr.stockey.keywordservice.mapper.KeywordDtoMapper;
import kr.stockey.keywordservice.service.KeywordService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/keywords")
@Slf4j
public class KeywordController {

    private final KeywordService keywordService;
    private final KeywordDtoMapper keywordDtoMapper;
    private final MemberClient memberClient;

    @Operation(summary = "keyword detail", description = "키워드 상세정보")
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "요청 성공"),
                    @ApiResponse(responseCode = "400", description = "잘못된 요청"),
                    @ApiResponse(responseCode = "404", description = "키워드 데이터 없음")
            }
    )
    @GetMapping("/{keywordsId}")
    public ResponseEntity<ResponseDto> getKeywordDetail(@Valid @NotNull @Min(value = -1) @PathVariable Long keywordsId) {
        KeywordDto keywordDto = keywordService.getKeywordDetail(keywordsId);
        KeywordDetailResponse keywordDetailResponse = keywordDtoMapper.toKeywordDetailResponse(keywordDto);
        return new ResponseEntity<>(new ResponseDto("키워드 상세 정보", keywordDetailResponse), HttpStatus.OK);
    }


    @Operation(summary = "keyword frequency", description = "모든 기간의 키워드 빈도")
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "요청 성공"),
            }
    )
    @GetMapping("/{keywordsId}/frequency")
    public ResponseEntity<ResponseDto> getKeywordFreq(@Valid @NotNull @Min(value = -1) @PathVariable Long keywordsId) {
        List<KeywordStatisticDto> keywordFreq = keywordService.getKeywordFreq(keywordsId);
        return new ResponseEntity<>(new ResponseDto("일자별 키워드 빈도", keywordFreq), HttpStatus.OK);
    }


    // 내 관심키워드 리스트
    @Operation(summary = "관심 키워드 리스트", description = "내 관심 키워드 리스트를 출력합니다.")
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "요청 성공"),
                    @ApiResponse(responseCode = "401", description = "권한 없음")
            }
    )
    @GetMapping("/keywordlist/my")
    public ResponseEntity<ResponseDto> getMyKeywords() {
        MemberDto memberDto = getMember();
        List<KeywordDto> myKeywords = keywordService.getMyKeywords(memberDto);
        return new ResponseEntity<>(new ResponseDto("관심 키워드 출력!",
                keywordDtoMapper.toKeywordResponse(myKeywords)), HttpStatus.OK);

    }

    // 관심 키워드 체크
    @Operation(summary = "관심 키워드 체크", description = "관심 키워드 체크")
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "요청 성공"),
                    @ApiResponse(responseCode = "401", description = "권한 없음")
            }
    )
    @GetMapping("/keywordlist/my/{id}")
    public ResponseEntity<ResponseDto> checkFavorite(@PathVariable Long id) {
        MemberDto memberDto = getMember();
        boolean result = keywordService.checkFavorite(memberDto.getId(), id);
        return new ResponseEntity<>(new ResponseDto("관심 키워드 여부 체크!", result), HttpStatus.OK);
    }

    // 관심 키워드 등록
    @Operation(summary = "관심 키워드 등록", description = "관심 키워드를 등록합니다.")
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "201", description = "등록 성공"),
                    @ApiResponse(responseCode = "400", description = "이미 관심 키워드 등록"),
                    @ApiResponse(responseCode = "401", description = "권한 없음"),
                    @ApiResponse(responseCode = "404", description = "키워드 없음"),
            }
    )
    @PostMapping("/keywordlist/my/{id}")
    public ResponseEntity<ResponseDto> addFavorite(@PathVariable Long id) {
        MemberDto memberDto = getMember();
        keywordService.addFavorite(memberDto,id);
        return new ResponseEntity<>(new ResponseDto("관심 키워드 등록 성공!", null), HttpStatus.CREATED);
    }

    // 관심 산업 삭제
    @Operation(summary = "관심 키워드 삭제", description = "관심 키워드를 삭제합니다.")
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "삭제 성공"),
                    @ApiResponse(responseCode = "400", description = "잘못된 요청"),
                    @ApiResponse(responseCode = "401", description = "권한 없음"),
                    @ApiResponse(responseCode = "404", description = "키워드 없음"),
            }
    )
    @DeleteMapping("/keywordlist/my/{id}")
    public ResponseEntity<ResponseDto> deleteFavorite(@PathVariable Long id) {
        MemberDto memberDto = getMember();
        keywordService.deleteFavorite(memberDto,id);
        return new ResponseEntity<>(new ResponseDto("DELETED", null), HttpStatus.OK);
    }


    @Operation(summary = "TopN 키워드 리턴", description = "economy, industry, stock 가각에 대해 특정 기간의 TopN 키워드 리턴")
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "요청 성공")
            }
    )
    @GetMapping("/topN")
    public ResponseEntity<ResponseDto> getTopNKeyword(@Valid @ModelAttribute GetTopNKeywordRequest getTopNKeywordRequest) {
        Long totalNewsCount = keywordService.getTargetNewsCount(getTopNKeywordRequest);
        List<TopKeywordDTO> topKeywordDTO = keywordService.getTopNKeyword(getTopNKeywordRequest);
        GetTopNKeywordResponse getTopNKeywordResponse = new GetTopNKeywordResponse(totalNewsCount, topKeywordDTO);
        return new ResponseEntity<>(new ResponseDto("OK", getTopNKeywordResponse), HttpStatus.OK);
    }


    @Operation(summary = "keyphrase 제공", description = "특정 기간의 클러스터링 keyphrase을 제공합니다.")
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "요청 성공"),
                    @ApiResponse(responseCode = "400", description = "잘못된 요청"),
                    @ApiResponse(responseCode = "404", description = "키워드 없음"),
            }
    )
    @GetMapping("/{keywordsId}/keyphrase")
    public ResponseEntity<ResponseDto> GetKeyphrase(@PathVariable Long keywordsId,
                                                    @Valid @ModelAttribute GetKeyphraseRequest getKeyphraseRequest) {
        log.info("----------GetKeyphrase----------");
        Long memberId = getMemberId();
        keywordService.setKeyphraseRequestToTopic(new KeyphraseRequestDto(memberId, keywordsId, getKeyphraseRequest));
        return new ResponseEntity<>(new ResponseDto("OK", null), HttpStatus.OK);
    }

    /*
        @GetMapping("/{keywordsId}/keyphrase") 요청을 보낸 후 데이터를 가져오기 위한 url
     */
    @GetMapping("/keyphrase/poll")
    public ResponseEntity<ResponseDto> pollKeyphrase() {
        Long memberId = getMemberId();
        List<KeyphraseResponseMessageDto> keyphraseResponseMessageDtos = keywordService.pollKeyphraseData(memberId);
        return new ResponseEntity<>(new ResponseDto("OK", keyphraseResponseMessageDtos), HttpStatus.OK);
    }

    @Operation(summary = "검색", description = "keyword 검색 결과를 제공합니다.")
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "삭제 성공"),
                    @ApiResponse(responseCode = "400", description = "잘못된 요청"),
            }
    )
    @GetMapping("/search")
    public ResponseEntity<ResponseDto> getStockSearch(@RequestParam String keyword) {
        List<KeywordDto> searchKeyword = keywordService.getSearchKeyword(keyword);
        List<KeywordSearchResponse> keywordSearchResponses = keywordDtoMapper.toKeywordSearchResponse(searchKeyword);
        return new ResponseEntity<>(new ResponseDto("OK", keywordSearchResponses), HttpStatus.OK);
    }
    private MemberDto getMember() {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        String memberId = request.getHeader("X-UserId");
        return memberClient.getMember(memberId);
    }

    private Long getMemberId() {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        String memberId = request.getHeader("X-UserId");
        return Long.valueOf(memberId);
    }

    /* --------------  다른 서비스에서 호출하는 메소드 [start] ----------------  */

    @GetMapping("/client/{keywordId}")
    public ResponseEntity<KeywordDto> getKeyword(@PathVariable("keywordId") Long keywordId) {
        KeywordDto keywordDto = keywordService.getKeywordDetail(keywordId);
        return new ResponseEntity<>(keywordDto, HttpStatus.OK);
    }


    @GetMapping("/client/correlation/{keywordId}")
    public ResponseEntity<List<KeywordStatisticDto>> getCountDate(@PathVariable("keywordId") Long keywordId,
                                                                  @RequestParam("startDate") String startDate,
                                                                  @RequestParam("endDate") String endDate) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyMMdd");
        LocalDate startDate_ = LocalDate.parse(startDate, formatter);
        LocalDate endDate_ = LocalDate.parse(endDate, formatter);

        List<KeywordStatisticDto> countDate = keywordService.getCountDate(keywordId, startDate_, endDate_);
        return new ResponseEntity<>(countDate, HttpStatus.OK);
    }

    @GetMapping("/v2/{keywordsId}")
    public ResponseEntity<KeywordDetailResponse> getKeywordDetailV2(@Valid @NotNull @Min(value = -1) @PathVariable Long keywordsId) {
        KeywordDto keywordDto = keywordService.getKeywordDetail(keywordsId);
        KeywordDetailResponse keywordDetailResponse = keywordDtoMapper.toKeywordDetailResponse(keywordDto);
        return new ResponseEntity<>(keywordDetailResponse, HttpStatus.OK);
    }

    @GetMapping("/v2/{keywordsId}/frequency")
    public ResponseEntity<List<KeywordStatisticDto>> getKeywordFreqV2(@Valid @NotNull @Min(value = -1) @PathVariable Long keywordsId) {
        List<KeywordStatisticDto> keywordFreq = keywordService.getKeywordFreq(keywordsId);
        return new ResponseEntity<>(keywordFreq, HttpStatus.OK);
    }

    /* --------------  다른 서비스에서 호출하는 메소드 [end]  ----------------  */


}
