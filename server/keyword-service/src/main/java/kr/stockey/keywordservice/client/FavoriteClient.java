package kr.stockey.keywordservice.client;


import kr.stockey.keywordservice.dto.core.ResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name = "favorite-service")
public interface FavoriteClient {


    @GetMapping
    ResponseDto findKeywordsByUserId(String userId);

    @GetMapping
    ResponseDto existsByUserIdAndKeyword(String userId, Long keywordId);

}
