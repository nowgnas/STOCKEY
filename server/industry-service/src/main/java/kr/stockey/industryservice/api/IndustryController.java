package kr.stockey.industryservice.api;

import com.ssafy.backend.domain.industry.api.response.GetIndustryMarketCapResponse;
import com.ssafy.backend.domain.industry.api.response.GetIndustryResponse;
import com.ssafy.backend.domain.industry.api.response.IndustryCapitalDto;
import com.ssafy.backend.domain.industry.dto.IndustryDto;
import com.ssafy.backend.domain.industry.mapper.IndustryDtoMapper;
import com.ssafy.backend.domain.industry.service.IndustryService;
import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.member.service.MemberService;
import com.ssafy.backend.domain.stock.api.response.GetStockTodayResponse;
import com.ssafy.backend.domain.stock.dto.StockBriefDto;
import com.ssafy.backend.global.annotation.Auth;
import com.ssafy.backend.global.dto.ResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@Slf4j
@RequestMapping("/industry")
@RequiredArgsConstructor
@Tag(name = "산업 ", description = "산업 관련 API 입니다.")
public class IndustryController {
    private final IndustryService industryService;

    private final MemberService memberService;
    private final IndustryDtoMapper dtoMapper;


    @Operation(summary = "산업 리스트 목록 반환 ", description = "산업 리스트를 반환해주는 메소드입니다.")
    @GetMapping
    public ResponseEntity<ResponseDto> getAll() {
        List<IndustryDto> all = industryService.getAll();
        return new ResponseEntity<>(new ResponseDto("OK", all), HttpStatus.OK);
    }

    // 산업 상세 설명

    @Operation(summary = "단일 산업 반환 ", description = "산업 하나의 정보를 반환해주는 메소드입니다.")
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "요청 성공"),
                    @ApiResponse(responseCode = "404", description = "해당 산업 없음")
            }
    )
    @GetMapping("/{id}")
    public ResponseEntity<ResponseDto> getOne(@PathVariable Long id) {
        IndustryDto one = industryService.getOne(id);
        return new ResponseEntity<>(new ResponseDto("OK", one), HttpStatus.OK);
    }

    @Operation(summary = "산업별 시가총액 리스트", description = "산업별 시가총액 리스트를 반환합니다. 시가총액 순으로 정렬")
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "요청 성공"),
            }
    )
    @GetMapping("/marketcap")
    public ResponseEntity<ResponseDto> getAllMarketCapList() {
        List<IndustryCapitalDto> allMarketCap = industryService.getAllMarketCap();
        return new ResponseEntity<>(new ResponseDto("OK", allMarketCap), HttpStatus.OK);
    }


    @Operation(summary = "종목 시가총액 top5 ", description = "시가총액 순으로 정렬")
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "요청 성공"),
            }
    )
    @GetMapping("/stocklist")
    public ResponseEntity<ResponseDto> getTop5Stocks() {
        List<StockBriefDto> stockList = industryService.getStockList();
        return new ResponseEntity<>(new ResponseDto("OK", stockList), HttpStatus.OK);
    }


    @Operation(summary = "해당 산업 시가총액 top5", description = "해당 산업에 해당하는 종목 리스트들을 반환해주는 리스트입니다.(시가총액 순으로 정렬)")
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "요청 성공"),
                    @ApiResponse(responseCode = "404", description = "해당 산업 없음"
                    )
            }
    )
    @GetMapping("/stocklist/{id}")
    public ResponseEntity<ResponseDto> getStockList(@PathVariable Long id) {
        List<StockBriefDto> stockList = industryService.getStockList(id);
        return new ResponseEntity<>(new ResponseDto("OK", stockList), HttpStatus.OK);
    }

    //산업에 해당하는 기업 리스트의 현재가 출력
    @Operation(summary = "해당 산업의 주식현재가격 출력", description = "해당 산업에 해당하는 종목 리스트의 현재가를 반환해주는 리스트입니다")
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "요청 성공"),
                    @ApiResponse(responseCode = "404", description = "해당 산업 없음")
            }
    )
    @GetMapping("/stocklist/{id}/current")
    public ResponseEntity<ResponseDto> getStockCurrent(@PathVariable Long id){
        List<GetStockTodayResponse> stockListPrice = industryService.getStockListPrice(id);
        return new ResponseEntity<>(new ResponseDto("OK", stockListPrice), HttpStatus.OK);
    }



    // 내 관심산업 리스트
    @Auth
    @Operation(summary = "관심 산업 리스트", description = "내 관심 산업 리스트를 출력합니다.")
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "요청 성공")
            }
    )
    @GetMapping("stocklist/my")
    public ResponseEntity<ResponseDto> getMyIndustries() {
        Member member = memberService.getMemberEntity();
        List<IndustryDto> myIndustries = industryService.getMyIndustries(member);
        List<GetIndustryResponse> getIndustryResponses = dtoMapper.toGetResponse(myIndustries);
        return new ResponseEntity<>(new ResponseDto("OK", getIndustryResponses), HttpStatus.OK);

    }

    // 관심 여부 확인
    @Auth
    @Operation(summary = "산업 관심 여부 체크", description = "해당 산업이 관심등록 했는지 체크합니다.")
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "요청 성공"),
                    @ApiResponse(responseCode = "401", description = "로그인 필요"),
                    @ApiResponse(responseCode = "404", description = "산업 없음"),
            }
    )
    @GetMapping("stocklist/my/{id}")
    public ResponseEntity<ResponseDto> checkFavorite(@PathVariable Long id) {
        Member member = memberService.getMemberEntity();
        boolean result = industryService.checkFavorite(member, id);
        return new ResponseEntity<>(new ResponseDto("OK", result), HttpStatus.OK);
    }

    // 관심 산업 등록
    @Auth
    @Operation(summary = "관심 산업 등록", description = "관심 산업을 등록합니다.")
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "201", description = "등록 성공"),
                    @ApiResponse(responseCode = "400", description = "이미 관심 산업 등록"),
                    @ApiResponse(responseCode = "404", description = "산업 없음"),
            }
    )
    @PostMapping("stocklist/my/{id}")
    public ResponseEntity<ResponseDto> addFavorite(@PathVariable Long id) {
        Member member = memberService.getMemberEntity();
        industryService.addFavorite(member, id);
        return new ResponseEntity<>(new ResponseDto("CREATED", null), HttpStatus.CREATED);
    }

    // 관심 산업 삭제
    @Auth
    @Operation(summary = "관심 산업 삭제", description = "관심 산업을 삭제합니다.")
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "201", description = "등록 성공"),
                    @ApiResponse(responseCode = "400", description = "다른 유저, 관심 산업 등록 X"),
                    @ApiResponse(responseCode = "404", description = "산업 없음"),
            }
    )
    @DeleteMapping("stocklist/my/{id}")
    public ResponseEntity<ResponseDto> deleteFavorite(@PathVariable Long id) {
        Member member = memberService.getMemberEntity();
        industryService.deleteFavorite(member, id);
        return new ResponseEntity<>(new ResponseDto("DELETED", null), HttpStatus.OK);
    }


    //산업별 시가총액 데이터 출력
    @Operation(summary = "산업 하나의 날짜별 시가총액 그래프", description = "산업하나의 날짜별 시가총액 합을 제공합니다. ")
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "조회 성공"),
                    @ApiResponse(responseCode = "404", description = "산업 없음")
            }
    )
    @GetMapping("/marketcap/{id}")
    public ResponseEntity<ResponseDto> getMarketCapByDate(@PathVariable Long id) {
        List<GetIndustryMarketCapResponse> marketCapList = industryService.getMarketCapList(id);
        return new ResponseEntity<>(new ResponseDto("OK", marketCapList), HttpStatus.OK);
    }





}
