package kr.stockey.stockservice.client;


import org.springframework.cloud.openfeign.FeignClient;

@FeignClient(name = "industry-service")
public interface IndustryClient {
}
