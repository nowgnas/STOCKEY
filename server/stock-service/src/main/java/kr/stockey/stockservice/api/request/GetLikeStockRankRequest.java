package kr.stockey.stockservice.api.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class GetLikeStockRankRequest {
    List<Long> stockList;
    Long stockId;
}
