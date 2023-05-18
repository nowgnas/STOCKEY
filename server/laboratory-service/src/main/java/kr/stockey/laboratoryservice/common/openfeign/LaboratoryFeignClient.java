package kr.stockey.laboratoryservice.common.openfeign;

import kr.stockey.laboratoryservice.domain.keyword.dto.KeywordDetailDto;
import kr.stockey.laboratoryservice.domain.keyword.dto.KeywordStatisticDto;
import kr.stockey.laboratoryservice.domain.laboratory.dto.ResponseDto;
import kr.stockey.laboratoryservice.domain.stock.dto.DailyStockDto;
import kr.stockey.laboratoryservice.domain.stock.dto.StockPreviewDto;
import kr.stockey.laboratoryservice.domain.stock.dto.StockSearchDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "laboratory-service", url = "https://stockey.kr/api")
public interface LaboratoryFeignClient {
    @GetMapping("/stock")
    List<StockPreviewDto> getAllStock();

    /**
     * 주식 종목 조회
     *
     * @param keyword 사용자 입력
     * @return 사용자 입력 단어 포함 주식 종목 리스트
     */
    @GetMapping("/stock/search")
    List<StockSearchDto> getStockSearch(@RequestParam String keyword);

    /**
     * 주식 키워드 검색
     *
     * @param keyword 사용자 입력 키워드
     * @return 사용자 입력 키워드 포함 키워드 리스트
     */

    @GetMapping("/keywords/search")
    ResponseDto getKeywordSearch(@RequestParam String keyword);

    @GetMapping("/keywords/v2/{id}/frequency")
    List<KeywordStatisticDto> getKeywordDaily(@PathVariable Long id);

    @GetMapping("/keywords/v2/{id}")
    KeywordDetailDto getKeywordDetail(@PathVariable Long id);

    @GetMapping("/stock/{id}/dailystock")
    List<DailyStockDto> getDailyStock(@PathVariable Long id);
}
