package kr.stockey.keywordservice.client;


import org.springframework.cloud.openfeign.FeignClient;

@FeignClient(name = "news-service")
public interface NewsClient {

}
