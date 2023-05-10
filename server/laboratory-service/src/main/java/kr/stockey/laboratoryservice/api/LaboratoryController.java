package kr.stockey.laboratoryservice.api;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import kr.stockey.laboratoryservice.api.response.SearchStockResponse;
import kr.stockey.laboratoryservice.dto.ResponseDto;
import kr.stockey.laboratoryservice.service.LaboratoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class LaboratoryController {
    private final LaboratoryService laboratoryService;

    @GetMapping("health")
    public ResponseEntity<ResponseDto> healthCheck() {
        return ResponseEntity.ok(
                ResponseDto.builder()
                .data("laboratory health check success")
                .build());
    }

    /**
     * 주식 이름으로 일치하는 주식 종목 찾기
     *
     * @param name 사용자 입력 주식 이름
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
    @GetMapping("search/{name}")
    public ResponseEntity<ResponseDto> searchStock(@PathVariable String name) {
        SearchStockResponse searchStockResponse = laboratoryService.searchStock(name);

        return ResponseEntity.ok(ResponseDto.builder()
                .message("request success")
                .data(searchStockResponse)
                .build());
    }
}
