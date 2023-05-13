package kr.stockey.industryservice.client;


import org.springframework.cloud.openfeign.FeignClient;

@FeignClient(name = "stock-service")
public interface StockClient {

}
