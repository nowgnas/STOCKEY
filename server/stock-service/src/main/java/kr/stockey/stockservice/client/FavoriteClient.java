package kr.stockey.stockservice.client;


import kr.stockey.stockservice.api.request.GetLikeStockRankRequest;
import kr.stockey.stockservice.dto.core.FavoriteDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "favorite-service")
public interface FavoriteClient {

    @GetMapping("/favorite/client/stock/my/{memberId}")
    List<FavoriteDto> getMyFavoriteStock(@PathVariable("memberId") Long memberId);

    @GetMapping("/favorite/client/stock/check/{memberId}")
    Boolean checkFavoriteStock(@PathVariable("memberId") Long memberId,
                               @RequestParam("stockId") Long stockId);


    @PostMapping("/favorite/client/stock/{memberId}")
    Void createFavoriteStock(@PathVariable("memberId") Long memberId,
                             @RequestParam("stockId") Long stockId);

    @DeleteMapping("/favorite/client/stock/{memberId}")
    Void deleteFavoriteStock(@PathVariable("memberId") Long memberId,
                             @RequestParam("stockId") Long stockId);

    @PostMapping("/favorite/client/stock/rank")
    Integer getLikeStockRank(GetLikeStockRankRequest request);


}
