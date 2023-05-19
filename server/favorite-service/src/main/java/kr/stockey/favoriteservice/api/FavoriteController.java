package kr.stockey.favoriteservice.api;

import kr.stockey.favoriteservice.api.request.GetLikeStockRankRequest;
import kr.stockey.favoriteservice.dto.core.FavoriteDto;
import kr.stockey.favoriteservice.service.FavoriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/favorite")
@RequiredArgsConstructor
public class FavoriteController {
    private final FavoriteService favoriteService;

    /* --------------  다른 서비스에서 호출하는 메소드 [start] ----------------  */

    @GetMapping("/client/industry/my/{memberId}")
    public ResponseEntity<List<FavoriteDto>> getMyFavoriteIndustry(@PathVariable("memberId") Long memberId) {
        List<FavoriteDto> favoriteDtoList = favoriteService.findByIndustry(memberId);
        return new ResponseEntity<>(favoriteDtoList, HttpStatus.OK);
    }

    @GetMapping("/client/stock/my/{memberId}")
    public ResponseEntity<List<FavoriteDto>> getMyFavoriteStock(@PathVariable("memberId") Long memberId) {
        List<FavoriteDto> favoriteDtoList = favoriteService.findByStock(memberId);
        return new ResponseEntity<>(favoriteDtoList, HttpStatus.OK);
    }

    @GetMapping("/client/keyword/my/{memberId}")
    public ResponseEntity<List<FavoriteDto>> getMyFavoriteKeyword(@PathVariable("memberId") Long memberId) {
        List<FavoriteDto> favoriteDtoList = favoriteService.findByKeyword(memberId);
        return new ResponseEntity<>(favoriteDtoList, HttpStatus.OK);
    }

    @GetMapping("/client/industry/check/{memberId}")
    public ResponseEntity<Boolean> checkFavoriteIndustry(@PathVariable("memberId") Long memberId
            ,@RequestParam("industryId") Long industryId) {
        boolean result = favoriteService.existsByMemberAndIndustry(industryId, memberId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/client/stock/check/{memberId}")
    public ResponseEntity<Boolean> checkFavoriteStock(@PathVariable("memberId") Long memberId
            ,@RequestParam("stockId") Long stockId) {
        boolean result = favoriteService.existsByMemberAndStock(stockId, memberId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("keyword/check/{memberId}")
    public ResponseEntity<Boolean> checkFavoriteKeyword(@PathVariable("memberId") Long memberId
            ,@RequestParam("keywordId") Long keywordId) {
        boolean result = favoriteService.existsByMemberAndKeyword(keywordId, memberId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/client/industry/{memberId}")
    public ResponseEntity<Void> createFavoriteIndustry(@PathVariable("memberId") Long memberId
            ,@RequestParam("industryId") Long industryId) {
        favoriteService.createFavoriteIndustry(industryId, memberId);
        return new ResponseEntity<>(null, HttpStatus.CREATED);
    }

    @PostMapping("/client/stock/{memberId}")
    public ResponseEntity<Void> createFavoriteStock(@PathVariable("memberId") Long memberId
            ,@RequestParam("stockId") Long stockId) {
        favoriteService.createFavoriteStock(stockId, memberId);
        return new ResponseEntity<>(null, HttpStatus.CREATED);    }

    @PostMapping("/client/keyword/{memberId}")
    public ResponseEntity<Void> createFavoriteKeyword(@PathVariable("memberId") Long memberId
            ,@RequestParam("keywordId") Long keywordId) {
        favoriteService.createFavoriteKeyword(keywordId, memberId);
        return new ResponseEntity<>(null, HttpStatus.CREATED);    }

    @DeleteMapping("/client/industry/{memberId}")
    public ResponseEntity<Void> deleteFavoriteIndustry(@PathVariable("memberId") Long memberId
            ,@RequestParam("industryId") Long industryId) {
        favoriteService.deleteFavoriteIndustry(industryId, memberId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/client/stock/{memberId}")
    public ResponseEntity<Void> deleteFavoriteStock(@PathVariable("memberId") Long memberId
            ,@RequestParam("stockId") Long stockId) {
        favoriteService.deleteFavoriteStock(stockId, memberId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/client/keyword/{memberId}")
    public ResponseEntity<Void> deleteFavoriteKeyword(@PathVariable("memberId") Long memberId
            ,@RequestParam("keywordId") Long keywordId) {
        favoriteService.deleteFavoriteKeyword(keywordId, memberId);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @PostMapping("/client/stock/rank")
    Integer getLikeStockRank(@RequestBody GetLikeStockRankRequest request){
        return favoriteService.getLikeStockRank(request);
    }

    /* --------------  다른 서비스에서 호출하는 메소드 [end]  ----------------  */


}
