package kr.stockey.industryservice.client;

import org.springframework.cloud.openfeign.FeignClient;

@FeignClient(name = "favorite-service")
public interface FavoriteClient {

}
