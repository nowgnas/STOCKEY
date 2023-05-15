package kr.stockey.keywordservice.client;

import kr.stockey.keywordservice.dto.core.ResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient(name = "favorite-service")
public interface FavoriteClient {

    @GetMapping("/favorite/keyword/my")
    ResponseDto getMyFavoriteKeyword();

    @GetMapping("/favorite/keyword/check/{keywordId}")
    ResponseDto checkFavoriteKeyword(@PathVariable Long keywordId);

    @PostMapping("/favorite/keyword/{keywordId}")
    ResponseDto createFavoriteKeyword(@PathVariable Long keywordId);

    @DeleteMapping("/favorite/keyword/{keywordId}")
    Void deleteFavorite(@PathVariable Long keywordId);

}