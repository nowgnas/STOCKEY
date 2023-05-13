package kr.stockey.keywordservice.client;

import kr.stockey.keywordservice.dto.core.ResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient(name = "favorite-service")
public interface FavoriteClient {

    @GetMapping("/keyword/my")
    ResponseDto getMyFavoriteKeyword();

    @GetMapping("keyword/check/{keywordId}")
    ResponseDto checkFavoriteKeyword(@PathVariable Long keywordId);

    @PostMapping("keyword/{keywordId}")
    ResponseDto createFavoriteKeyword(@PathVariable Long keywordId);

    @DeleteMapping("/{favoriteId}")
    Void deleteFavorite(@PathVariable Long favoriteId);

}
