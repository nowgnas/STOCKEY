package kr.stockey.keywordservice.client;


import org.springframework.cloud.openfeign.FeignClient;

@FeignClient(name = "favorite-service")
public interface FavoriteClient {
}
