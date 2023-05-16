package kr.stockey.stockservice.api.request;

import lombok.AllArgsConstructor;

import java.util.List;

@AllArgsConstructor
public class GetLikeStockRankRequest {
    List<Long> stockList;
    Long stockId;
}
