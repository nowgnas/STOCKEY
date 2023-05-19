package kr.stockey.investmentservice.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Map;

@FeignClient(name = "member-service")
public interface MemberClient {
    @GetMapping("/member/client/entire")
    Map<Long, String> getWholeMembers();
}
