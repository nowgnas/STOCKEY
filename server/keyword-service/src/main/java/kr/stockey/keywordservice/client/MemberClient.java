package kr.stockey.keywordservice.client;


import org.springframework.cloud.openfeign.FeignClient;

@FeignClient(name = "member-service")
public interface MemberClient {
}
