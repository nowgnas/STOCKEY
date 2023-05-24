package kr.stockey.favoriteservice.api.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
public class GetLikeStockRankRequest {
    List<Long> stockList;
    Long stockId;
}
