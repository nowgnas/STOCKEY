package kr.stockey.laboratoryservice.domain.laboratory.service;

import kr.stockey.laboratoryservice.common.openfeign.LaboratoryFeignClient;
import kr.stockey.laboratoryservice.domain.keyword.dto.*;
import kr.stockey.laboratoryservice.domain.laboratory.api.response.RegressionResponse;
import kr.stockey.laboratoryservice.domain.laboratory.dto.ResponseDto;
import kr.stockey.laboratoryservice.domain.laboratory.dto.StockPriceNFreqDto;
import kr.stockey.laboratoryservice.domain.laboratory.mapper.LaboratoryMapper;
import kr.stockey.laboratoryservice.domain.stock.dto.DailyStockDto;
import kr.stockey.laboratoryservice.domain.stock.dto.StockPreviewDto;
import kr.stockey.laboratoryservice.domain.stock.dto.StockSearchDto;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LaboratoryServiceImpl implements LaboratoryService {
    private final LaboratoryFeignClient laboratoryFeignClient;
    private final LaboratoryMapper laboratoryMapper;


    @Override
    public RegressionResponse getGraphData(Long stockId, Long id1, Long id2, Long id3) {
        // graph data
        List<GraphDataDto> list = new ArrayList<>();
        List<DotDto> startEnd = new ArrayList<>();
        // get stock daily price
        List<DailyStockDto> dailyStock = laboratoryFeignClient.getDailyStock(stockId);

        Map<LocalDate, StockPriceNFreqDto> hashmap = getLocalDateStockPriceNFreqDtoMap(dailyStock);

        getRegressionNGraphData(id1, list, startEnd, hashmap);
        getRegressionNGraphData(id2, list, startEnd, hashmap);
        getRegressionNGraphData(id3, list, startEnd, hashmap);


        return RegressionResponse.builder()
                .graphData(list) // List
                .regression(null) // List
                .constant(null) // Double
                .build();
    }

    private void getRegressionNGraphData(Long id1, List<GraphDataDto> list, List<DotDto> startEnd, Map<LocalDate, StockPriceNFreqDto> hashmap) {
        List<KeywordStatisticDto> keywordDaily = laboratoryFeignClient.getKeywordDaily(id1);
        for (KeywordStatisticDto item :
                keywordDaily) {
            if (hashmap.get(item.getStatisticDate()) != null) {
                startEnd.add(
                        DotDto.builder()
                                .x(item.getCount())
                                .y(hashmap.get(item.getStatisticDate()).getPrice())
                                .build());
            }
        }


        KeywordDetailDto keywordDetail = laboratoryFeignClient.getKeywordDetail(id1);
        List<DotDto> line = new ArrayList<>();
        line.add(startEnd.get(0));
        line.add(startEnd.get(startEnd.size() - 1));

        list.add(GraphDataDto.builder()
                .keyword(keywordDetail.getName())
                .line(line)
                .scatter(startEnd)
                .lastDate(line.get(1))
                .build());
    }

    @NotNull
    private static Map<LocalDate, StockPriceNFreqDto> getLocalDateStockPriceNFreqDtoMap(List<DailyStockDto> dailyStock) {
        Map<LocalDate, StockPriceNFreqDto> hashmap = new HashMap<>();

        for (DailyStockDto item :
                dailyStock) {
            hashmap.put(
                    item.getStockDate(),
                    StockPriceNFreqDto.builder()
                            .price(item.getClosePrice())
                            .build());
        }
        return hashmap;
    }

    @Override
    public List<StockSearchDto> getAllStock() {
        List<StockPreviewDto> allStock = laboratoryFeignClient.getAllStock();
        return laboratoryMapper.toStockList(allStock);
    }

    /**
     * 주식 종목 검색
     *
     * @param keyword 사용자 입력
     * @return 주식 종목 리스트
     */
    @Override
    public List<StockSearchDto> searchStocks(String keyword) {
        return laboratoryFeignClient.getStockSearch(keyword);
    }

    /**
     * 키워드 검색
     *
     * @param keyword 사용자 입력
     * @return 키워드 리스트
     */
    @Override
    public List<KeywordSearchDto> searchKeyword(String keyword) {
        ResponseDto keywordSearch = laboratoryFeignClient.getKeywordSearch(keyword);
        List<Object> data = (List<Object>) keywordSearch.getData();
        List<KeywordSearchDto> list = new ArrayList<>();
        for (Object item :
                data) {
            LinkedHashMap<String, ?> map = (LinkedHashMap<String, ?>) item;
            list.add(KeywordSearchDto.builder()
                    .id(((Integer) map.get("id")).longValue())
                    .name((String) map.get("name"))
                    .build());
        }
        return list;
    }
}
