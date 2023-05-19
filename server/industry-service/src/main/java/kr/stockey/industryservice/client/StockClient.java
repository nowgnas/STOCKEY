package kr.stockey.industryservice.client;


import kr.stockey.industryservice.dto.GetStockTodayResponse;
import kr.stockey.industryservice.dto.IndustrySumDto;
import kr.stockey.industryservice.dto.core.StockDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "stock-service")
public interface StockClient {

    @GetMapping("/stock/client/industry/{industryId}")
    List<StockDto> getByIndustryId(@PathVariable("industryId") Long industryId);

    @GetMapping("/stock/client")
    List<StockDto> getNStock(@RequestParam int page, @RequestParam int size);

    @GetMapping("/stock/client/marketcap-by-industry/{industryId}")
    List<StockDto> getNStockByindustry(@PathVariable("industryId") Long industryId, @RequestParam int page, @RequestParam int size);


    @GetMapping("/stock/client/marketcap-by-date/industry/{industryId}")
    List<IndustrySumDto> getMarketList(@PathVariable("industryId") Long industryId);

    @GetMapping("/stock/client/today/{industryId}")
    List<GetStockTodayResponse> findTodayDailyStock(@PathVariable("industryId") Long industryId);


}
