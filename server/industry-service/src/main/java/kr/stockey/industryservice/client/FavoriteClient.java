package kr.stockey.industryservice.client;

import kr.stockey.industryservice.dto.core.FavoriteDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@FeignClient(name = "favorite-service")
public interface FavoriteClient {

    @GetMapping("/favorite/client/industry/my")
    List<FavoriteDto> getMyFavoriteIndustry();

    @GetMapping("/favorite/client/industry/check/{industryId}")
    Boolean checkFavoriteIndustry(@PathVariable Long industryId);

    @PostMapping("/favorite/client/industry/{industryId}")
    Void createFavoriteIndustry(@PathVariable Long industryId);

    @DeleteMapping("/favorite/client/keyword/{industryId}")
    Void deleteFavoriteIndustry(@PathVariable Long industryId);
    }
