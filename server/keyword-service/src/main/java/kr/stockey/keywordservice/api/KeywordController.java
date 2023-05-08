package kr.stockey.keywordservice.api;

import kr.stockey.keywordservice.api.request.GetKeyphraseRequest;
import kr.stockey.keywordservice.api.request.GetTopNKeywordRequest;
import kr.stockey.keywordservice.api.response.GetTopNKeywordResponse;
import kr.stockey.keywordservice.api.response.KeywordDetailResponse;
import kr.stockey.keywordservice.api.response.KeywordSearchResponse;
import kr.stockey.keywordservice.client.MemberClient;
import kr.stockey.keywordservice.dto.*;
import kr.stockey.keywordservice.dto.core.MemberDto;
import kr.stockey.keywordservice.dto.core.ResponseDto;
import kr.stockey.keywordservice.mapper.KeywordDtoMapper;
import kr.stockey.keywordservice.service.KeywordService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/keywords")
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
    // TODO
    @Operation(summary = "관심 키워드 리스트", description = "내 관심 키워드 리스트를 출력합니다.")
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "요청 성공"),
                    @ApiResponse(responseCode = "401", description = "권한 없음")
            }
    )
    @GetMapping("/keywordlist/my")
    public ResponseEntity<ResponseDto> getMyKeywords(@RequestHeader String userId) {
        MemberDto memberDto = getMember(userId);
        List<KeywordDto> myKeywords = keywordService.getMyKeywords(memberDto);
        return new ResponseEntity<>(new ResponseDto("관심 키워드 출력!",
                keywordDtoMapper.toKeywordResponse(myKeywords)), HttpStatus.OK);

    }

    // 관심 키워드 체크
    // TODO 유저 인증
    @Operation(summary = "관심 키워드 체크", description = "관심 키워드 체크")
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "요청 성공"),
                    @ApiResponse(responseCode = "401", description = "권한 없음")
            }
    )
    @GetMapping("/keywordlist/my/{id}")
    public ResponseEntity<ResponseDto> checkFavorite(@RequestHeader String userId,@PathVariable Long id) {
        MemberDto memberDto = getMember(userId);
        boolean result = keywordService.checkFavorite(memberDto,id);
        return new ResponseEntity<>(new ResponseDto("관심 키워드 여부 체크!", result), HttpStatus.OK);
    }

    // 관심 키워드 등록
    // TODO 유저 인증
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
    public ResponseEntity<ResponseDto> addFavorite(@RequestHeader String userId,@PathVariable Long id) {
        MemberDto memberDto = getMember(userId);
        keywordService.addFavorite(memberDto,id);
        return new ResponseEntity<>(new ResponseDto("관심 키워드 등록 성공!", null), HttpStatus.CREATED);
    }

    // 관심 산업 삭제
    // TODO 유저 인증
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
    public ResponseEntity<ResponseDto> deleteFavorite(@RequestHeader String userId,@PathVariable Long id) {
        MemberDto memberDto = getMember(userId);
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
                                                    @Valid @ModelAttribute GetKeyphraseRequest getKeyphraseRequest){
        List<GetKeyPhraseResponse.Message> keyphrase = keywordService.getKeyphrase(keywordsId, getKeyphraseRequest);
        return new ResponseEntity<>(new ResponseDto("OK",keyphrase),HttpStatus.OK);
    }

    @Operation(summary = "검색", description = "keyword 검색 결과를 제공합니다.")
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "삭제 성공"),
                    @ApiResponse(responseCode = "400", description = "잘못된 요청"),
            }
    )
    @GetMapping("/search")
    public ResponseEntity<ResponseDto> getStockSearch(@RequestParam String keyword)  {
        List<KeywordDto> searchKeyword = keywordService.getSearchKeyword(keyword);
        List<KeywordSearchResponse> keywordSearchResponses = keywordDtoMapper.toKeywordSearchResponse(searchKeyword);
        return new ResponseEntity<>(new ResponseDto("OK",keywordSearchResponses),HttpStatus.OK);
    }


    private MemberDto getMember(String userId) {
        ResponseDto responseDto = memberClient.getMember(userId);
        MemberDto memberDto = (MemberDto) responseDto.getData();
        return memberDto;

    }



}
