package kr.stockey.favoriteservice.api;

import kr.stockey.favoriteservice.dto.core.FavoriteDto;
import kr.stockey.favoriteservice.service.FavoriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/favorite")
@RequiredArgsConstructor
public class FavoriteController {
    private final FavoriteService favoriteService;

    /* --------------  다른 서비스에서 호출하는 메소드 [start] ----------------  */

    @GetMapping("/client/industry/my")
    public ResponseEntity<List<FavoriteDto>> getMyFavoriteIndustry() {
        Long memberId = getMemberId();
        List<FavoriteDto> favoriteDtoList = favoriteService.findByIndustry(memberId);
        return new ResponseEntity<>(favoriteDtoList, HttpStatus.OK);
    }

    @GetMapping("/client/stock/my")
    public ResponseEntity<List<FavoriteDto>> getMyFavoriteStock() {
        Long memberId = getMemberId();
        List<FavoriteDto> favoriteDtoList = favoriteService.findByStock(memberId);
        return new ResponseEntity<>(favoriteDtoList, HttpStatus.OK);
    }

    @GetMapping("/client/keyword/my")
    public ResponseEntity<List<FavoriteDto>> getMyFavoriteKeyword() {
        Long memberId = getMemberId();
        List<FavoriteDto> favoriteDtoList = favoriteService.findByKeyword(memberId);
        return new ResponseEntity<>(favoriteDtoList, HttpStatus.OK);
    }

    @GetMapping("/client/industry/check/{industryId}")
    public ResponseEntity<Boolean> checkFavoriteIndustry(@PathVariable Long industryId) {
        Long memberId = getMemberId();
        boolean result = favoriteService.existsByMemberAndIndustry(industryId, memberId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/client/stock/check/{stockId}")
    public ResponseEntity<Boolean> checkFavoriteStock(@PathVariable Long stockId) {
        Long memberId = getMemberId();
        boolean result = favoriteService.existsByMemberAndStock(stockId, memberId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("keyword/check/{keywordId}")
    public ResponseEntity<Boolean> checkFavoriteKeyword(@PathVariable Long keywordId) {
        Long memberId = getMemberId();
        boolean result = favoriteService.existsByMemberAndKeyword(keywordId, memberId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/client/industry/{industryId}")
    public ResponseEntity<Void> createFavoriteIndustry(@PathVariable Long industryId) {
        Long memberId = getMemberId();
        favoriteService.createFavoriteIndustry(industryId, memberId);
        return new ResponseEntity<>(null, HttpStatus.CREATED);
    }

    @PostMapping("/client/stock/{stockId}")
    public ResponseEntity<Void> createFavoriteStock(@PathVariable Long stockId) {
        Long memberId = getMemberId();
        favoriteService.createFavoriteStock(stockId, memberId);
        return new ResponseEntity<>(null, HttpStatus.CREATED);    }

    @PostMapping("/client/keyword/{keywordId}")
    public ResponseEntity<Void> createFavoriteKeyword(@PathVariable Long keywordId) {
        Long memberId = getMemberId();
        favoriteService.createFavoriteKeyword(keywordId, memberId);
        return new ResponseEntity<>(null, HttpStatus.CREATED);    }

    @DeleteMapping("/client/stock/{industryId}")
    public ResponseEntity<Void> deleteFavoriteIndustry(@PathVariable Long industryId) {
        Long memberId = getMemberId();
        favoriteService.deleteFavoriteIndustry(industryId, memberId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/client/stock/{stockId}")
    public ResponseEntity<Void> deleteFavoriteStock(@PathVariable Long stockId) {
        Long memberId = getMemberId();
        favoriteService.deleteFavoriteStock(stockId, memberId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/client/keyword/{keywordId}")
    public ResponseEntity<Void> deleteFavoriteKeyword(@PathVariable Long keywordId) {
        Long memberId = getMemberId();
        favoriteService.deleteFavoriteKeyword(keywordId, memberId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    /* --------------  다른 서비스에서 호출하는 메소드 [end]  ----------------  */


    private Long getMemberId() {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        String stringId = request.getHeader("X-UserId");
        return Long.parseLong(stringId);
    }


}
