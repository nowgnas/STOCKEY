package kr.stockey.stockservice.client;


import kr.stockey.stockservice.api.request.CreateFavoriteStockRequest;
import kr.stockey.stockservice.dto.core.FavoriteDto;
import kr.stockey.stockservice.dto.core.ResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient(name = "favorite-service")
public interface FavoriteClient {
    
    // TODO : url 작성
    @GetMapping("")
    ResponseDto findByStockAndMember(String userId);
    
    // TODO url 작성
    @GetMapping("")
    ResponseDto existsByMemberAndStock(String memberId,Long stockId);


    //TODO url 작성
    @PostMapping("")
    Void saveStock(CreateFavoriteStockRequest request);

    //TODO url 작성
    @DeleteMapping("")
    Void deleteFavorite(FavoriteDto favoriteDto);

    //TODO url 작성
    @GetMapping("")
    ResponseDto findByMemberAndStock(String userID, Long stockId);

}
