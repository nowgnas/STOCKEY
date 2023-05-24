package kr.stockey.keywordservice.client;

import kr.stockey.keywordservice.dto.core.FavoriteDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "favorite-service")
public interface FavoriteClient {

    @GetMapping("/favorite/client/keyword/my/{memberId}")
    List<FavoriteDto> getMyFavoriteKeyword(@PathVariable("memberId") Long memberId);

    @GetMapping("/favorite/client/keyword/check/{memberId}")
    Boolean checkFavoriteKeyword(@PathVariable("memberId") Long memberId,
                                  @RequestParam("keywordId") Long keywordId);


    @PostMapping("/favorite/client/keyword/{memberId}")
    Void createFavoriteKeyword(@PathVariable("memberId") Long memberId,
                                @RequestParam("keywordId") Long keywordId);

    @DeleteMapping("/favorite/client/keyword/{memberId}")
    Void deleteFavoriteKeyword(@PathVariable("memberId") Long memberId,
                                @RequestParam("keywordId") Long keywordId);

}
