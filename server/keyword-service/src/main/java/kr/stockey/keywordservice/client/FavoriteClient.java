package kr.stockey.keywordservice.client;

import kr.stockey.keywordservice.dto.core.FavoriteDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@FeignClient(name = "favorite-service")
public interface FavoriteClient {

    @GetMapping("/favorite/client/keyword/my")
    List<FavoriteDto> getMyFavoriteKeyword();

    @GetMapping("/favorite/client/keyword/check/{keywordId}")
    Boolean checkFavoriteKeyword(@PathVariable Long keywordId);

    @PostMapping("/favorite/client/keyword/{keywordId}")
    Void createFavoriteKeyword(@PathVariable Long keywordId);

    @DeleteMapping("/favorite/client/keyword/{keywordId}")
    Void deleteFavorite(@PathVariable Long keywordId);

}
