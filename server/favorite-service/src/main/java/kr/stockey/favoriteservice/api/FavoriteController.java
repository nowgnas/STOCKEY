package kr.stockey.favoriteservice.api;

import kr.stockey.favoriteservice.dto.core.FavoriteDto;
import kr.stockey.favoriteservice.dto.core.ResponseDto;
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


    @GetMapping("/my/industry")
    public ResponseEntity<ResponseDto> getMyFavoriteIndustry() {
        Long memberId = getMemberId();
        List<FavoriteDto> favoriteDtoList = favoriteService.findByIndustry(memberId);
        return new ResponseEntity<>(new ResponseDto("OK", favoriteDtoList), HttpStatus.OK);
    }

    @GetMapping("/my/stock")
    public ResponseEntity<ResponseDto> getMyFavoriteStock() {
        Long memberId = getMemberId();
        List<FavoriteDto> favoriteDtoList = favoriteService.findByStock(memberId);
        return new ResponseEntity<>(new ResponseDto("OK", favoriteDtoList), HttpStatus.OK);
    }

    @GetMapping("/my/keyword")
    public ResponseEntity<ResponseDto> getMyFavoriteKeyword() {
        Long memberId = getMemberId();
        List<FavoriteDto> favoriteDtoList = favoriteService.findByKeyword(memberId);
        return new ResponseEntity<>(new ResponseDto("OK", favoriteDtoList), HttpStatus.OK);
    }

    @GetMapping("check/industry/{industryId}")
    public ResponseEntity<ResponseDto> checkFavoriteIndustry(@PathVariable Long industryId) {
        Long memberId = getMemberId();
        boolean result = favoriteService.existsByMemberAndIndustry(industryId, memberId);
        return new ResponseEntity<>(new ResponseDto("OK", result), HttpStatus.OK);
    }

    @GetMapping("check/stock/{stockId}")
    public ResponseEntity<ResponseDto> checkFavoriteStock(@PathVariable Long stockId) {
        Long memberId = getMemberId();
        boolean result = favoriteService.existsByMemberAndStock(stockId, memberId);
        return new ResponseEntity<>(new ResponseDto("OK", result), HttpStatus.OK);
    }

    @GetMapping("check/keyword/{keywordId}")
    public ResponseEntity<ResponseDto> checkFavoriteKeyword(@PathVariable Long keywordId) {
        Long memberId = getMemberId();
        boolean result = favoriteService.existsByMemberAndKeyword(keywordId, memberId);
        return new ResponseEntity<>(new ResponseDto("OK", result), HttpStatus.OK);
    }


    @DeleteMapping("/{favoriteId}")
    public ResponseEntity<Void> deleteFavorite(@PathVariable Long favoriteId) {
        Long memberId = getMemberId();
        favoriteService.delete(favoriteId, memberId);
        return new ResponseEntity<>(HttpStatus.OK);

    }



    private Long getMemberId() {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        String stringId = request.getHeader("X-UserId");
        return Long.parseLong(stringId);
    }


}
