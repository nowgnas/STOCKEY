package kr.stockey.stockservice.client;


import org.springframework.cloud.openfeign.FeignClient;

@FeignClient(name = "keyword-service")
public interface KeywordClient {

}
