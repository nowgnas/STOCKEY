package kr.stockey.keywordservice.client;


import kr.stockey.keywordservice.dto.core.ResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name = "member-service")
public interface MemberClient {

    @GetMapping
    ResponseDto getMember(String userId);


}
