package kr.stockey.investmentservice.api.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GetPopularStocksResponse {
    private Long stockId;
    private String stockName;
}
