package kr.stockey.investmentservice;

import kr.stockey.investmentservice.api.response.WholeStockInfoResponse;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class WholeStockInfoResponseTest {
    private Map<Long, Long> stockPriceMap = new HashMap<>();
    private Map<Long, String> stockIdToNameMap = new HashMap<>();

    @Test
    public void testCreateWholeStockInfoResponses() {
        // Setup
        stockPriceMap.put(1L, 100L);
        stockPriceMap.put(2L, 200L);
        stockIdToNameMap.put(1L, "Apple");
        stockIdToNameMap.put(2L, "Microsoft");

        // Execute
        List<WholeStockInfoResponse> responseList = createWholeStockInfoResponses();

        // Verify
        assertEquals(2, responseList.size());

        WholeStockInfoResponse response1 = responseList.get(0);
        assertEquals(1L, response1.getStockId());
        assertEquals("Apple", response1.getStockName());
        assertEquals(100L, response1.getStockPrice());

        WholeStockInfoResponse response2 = responseList.get(1);
        assertEquals(2L, response2.getStockId());
        assertEquals("Microsoft", response2.getStockName());
        assertEquals(200L, response2.getStockPrice());
    }

    public List<WholeStockInfoResponse> createWholeStockInfoResponses() {
        List<WholeStockInfoResponse> responses = new ArrayList<>();

        for (Long stockId : stockPriceMap.keySet()) {
            String stockName = stockIdToNameMap.get(stockId);
            Long stockPrice = stockPriceMap.get(stockId);
            responses.add(new WholeStockInfoResponse(stockId, stockName, stockPrice));
        }

        return responses;
    }
}
