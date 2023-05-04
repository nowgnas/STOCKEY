package kr.stockey.memberservice.api;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import kr.stockey.memberservice.api.response.MemberResponse;
import kr.stockey.memberservice.dto.ResponseDto;
import kr.stockey.memberservice.mapper.MemberDtoMapper;
import kr.stockey.memberservice.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Pattern;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;
    private final MemberDtoMapper memberDtoMapper;


    @Operation(summary = "check duplicated nickname", description = "닉네임 중복 검사")
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "닉네임 사용 가능"),
                    @ApiResponse(responseCode = "400", description = "닉네임 중복")
            }
    )
    @GetMapping("/nickname")
    public ResponseEntity<ResponseDto> checkNickname(@Valid @Pattern(regexp = "^[a-zA-Z0-9가-힣]{4,8}$")
                                                     @RequestParam String nickname) {
        memberService.checkDuplicatedNickname(nickname);
        return new ResponseEntity<>(new ResponseDto("닉네임 중복 확인!", null), HttpStatus.OK);
    }


    @Operation(summary = "Get member info", description = "회원 정보 가져오기")
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "요청 성공"),
                    @ApiResponse(responseCode = "400", description = "잘못된 요청"),
                    @ApiResponse(responseCode = "401", description = "토큰 만료")
            }
    )
    @GetMapping
    public ResponseEntity<ResponseDto> getMember() {
        MemberResponse memberResponse = memberDtoMapper.toGetMemberResponse(memberService.getMember());
        return new ResponseEntity<>(new ResponseDto("회원 정보 반환!", memberResponse), HttpStatus.OK);
    }


    @Operation(summary = "Delete member", description = "회원 탈퇴")
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "요청 성공"),
                    @ApiResponse(responseCode = "400", description = "잘못된 요청"),
                    @ApiResponse(responseCode = "401", description = "토큰 만료")
            }
    )
    @DeleteMapping
    public ResponseEntity<ResponseDto> deleteMember() {
        memberService.deleteMember();
        return new ResponseEntity<>(new ResponseDto("회원 삭제 완료!", null), HttpStatus.OK);
    }


    @Operation(summary = "Delete member", description = "회원 탈퇴")
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "요청 성공"),
                    @ApiResponse(responseCode = "400", description = "잘못된 요청"),
                    @ApiResponse(responseCode = "401", description = "토큰 만료")
            }
    )
    @PatchMapping("/nickname")
    public ResponseEntity<ResponseDto> changeMemberNickname(@Valid @Pattern(regexp = "^[a-zA-Z0-9가-힣]{4,8}$")
                                                            @RequestBody String nickname) {
        memberService.changeNickname(nickname);
        return new ResponseEntity<>(new ResponseDto("닉네임 변경 완료!", null), HttpStatus.OK);
    }
}