package kr.stockey.industryservice.client;

import kr.stockey.industryservice.dto.core.FavoriteDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "favorite-service")
public interface FavoriteClient {

    @GetMapping("/favorite/client/industry/my/{memberId}")
    List<FavoriteDto> getMyFavoriteIndustry(@PathVariable("memberId") Long memberId);

    @GetMapping("/favorite/client/industry/check/{memberId}")
    Boolean checkFavoriteIndustry(@PathVariable("memberId") Long memberId,
                               @RequestParam("industryId") Long industryId);


    @PostMapping("/favorite/client/industry/{memberId}")
    Void createFavoriteIndustry(@PathVariable("memberId") Long memberId,
                             @RequestParam("industryId") Long industryId);

    @DeleteMapping("/favorite/client/industry/{memberId}")
    Void deleteFavoriteIndustry(@PathVariable("memberId") Long memberId,
                             @RequestParam("industryId") Long industryId);
}
