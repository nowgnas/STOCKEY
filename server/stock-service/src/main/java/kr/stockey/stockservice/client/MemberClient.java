package kr.stockey.stockservice.client;

import kr.stockey.stockservice.dto.ResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "member-service")
public interface MemberClient {
    @GetMapping("/{userId}")
    ResponseDto getMemberResponse(@PathVariable("userId") String userId);
}