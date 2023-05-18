package kr.stockey.laboratoryservice.domain.laboratory.api;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import kr.stockey.laboratoryservice.domain.keyword.dto.KeywordSearchDto;
import kr.stockey.laboratoryservice.domain.laboratory.api.response.RegressionResponse;
import kr.stockey.laboratoryservice.domain.laboratory.dto.ResponseDto;
import kr.stockey.laboratoryservice.domain.laboratory.service.LaboratoryService;
import kr.stockey.laboratoryservice.domain.stock.dto.StockSearchDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class LaboratoryController {
    private final LaboratoryService laboratoryService;

    @GetMapping("data/graph")
    public ResponseEntity<ResponseDto> getGraphData(
            @RequestParam("stockid") Long stock,
            @RequestParam("id1") Long id1,
            @RequestParam("id2") Long id2,
            @RequestParam("id3") Long id3
    ) {
        RegressionResponse graphData = laboratoryService.getGraphData(stock, id1, id2, id3);

        return ResponseEntity.ok(
                ResponseDto.builder()
                        .data(graphData)
                        .build()
        );
    }

    /**
     * 전체 주식 종목 조회
     *
     * @return 주식 종목 리스트
     */
    @GetMapping("stock/list")
    public ResponseEntity<ResponseDto> stockList() {
        List<StockSearchDto> allStock = laboratoryService.getAllStock();
        return ResponseEntity.ok(
                ResponseDto.builder()
                        .data(allStock)
                        .message("request stock list success")
                        .build());
    }


    /**
     * 주식 이름으로 일치하는 주식 종목 찾기
     *
     * @param stock 사용자 입력 주식 이름
     * @return 사용자가 입력한 이름으로 시작하는 주식 리스트 반환
     * TODO: - 리스트 페이징 처리가 필요한가
     *       - 입력단어를 시작으로 할 것인가
     *       - 검색 결과가 없는 경우에 대한 메세지 전송 및 검색 결과 없음을 인지할 수 있는 데이터? 플래그 반환
     */
    @Operation(summary = "Get stock name list", description = "주식 리스트 가져오기")
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "요청 성공"),
                    @ApiResponse(responseCode = "400", description = "잘못된 요청")
            }
    )
    @GetMapping("stock/search/{stock}")
    public ResponseEntity<ResponseDto> searchStock(@PathVariable String stock) {
        List<StockSearchDto> stockSearchDtos = laboratoryService.searchStocks(stock);

        return ResponseEntity.ok(ResponseDto.builder()
                .message("request success")
                .data(stockSearchDtos)
                .build());
    }

    /**
     * 키워드 검색
     *
     * @param keyword 사용자 입력 키워드 이름
     * @return 사용자 입력 이름을 포함한 키워드 검색
     */
    @Operation(summary = "Get keyword list", description = "키워드 리스트 가져오기")
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "요청 성공"),
                    @ApiResponse(responseCode = "400", description = "잘못된 요청")
            }
    )
    @GetMapping("keyword/search/{keyword}")
    public ResponseEntity<ResponseDto> searchKeyword(@PathVariable String keyword) {
        List<KeywordSearchDto> keywordSearchDtos = laboratoryService.searchKeyword(keyword);

        return ResponseEntity.ok(ResponseDto.builder()
                .message("search keyword request success")
                .data(keywordSearchDtos)
                .build());

    }


}
