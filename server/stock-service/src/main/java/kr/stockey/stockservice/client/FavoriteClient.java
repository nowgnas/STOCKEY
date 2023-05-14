package kr.stockey.stockservice.client;


import kr.stockey.stockservice.dto.core.FavoriteDto;
import kr.stockey.stockservice.dto.core.ResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@FeignClient(name = "favorite-service")
public interface FavoriteClient {

    @GetMapping("/favorite/client/stock/my")
    List<FavoriteDto> getMyFavoriteStock();

    @GetMapping("/favorite/client/stock/check/{stockId}")
    Boolean checkFavoriteStock(@PathVariable Long stockId);


    @PostMapping("/client/stock/{stockId}")
    Void createFavoriteStock(@PathVariable Long stockId);

    //TODO url 작성
    @DeleteMapping("")
    Void deleteFavorite(FavoriteDto favoriteDto);

    //TODO url 작성
    @GetMapping("")
    ResponseDto findByMemberAndStock(Long memberId, Long stockId);

}
