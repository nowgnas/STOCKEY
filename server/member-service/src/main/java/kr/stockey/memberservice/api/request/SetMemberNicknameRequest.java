package kr.stockey.memberservice.api.request;

import lombok.*;

import javax.validation.constraints.Digits;
import javax.validation.constraints.Min;
import javax.validation.constraints.Pattern;


@Data
@NoArgsConstructor
public class SetMemberNicknameRequest {
    @Pattern(regexp = "^[a-zA-Z0-9가-힣]{4,8}$", message = "닉네임은 한글, 영어, 숫자만 가능합니다")
    private String nickname;
    @Min(value = -1, message = "Number must be greater than -1")
    @Digits(integer = 10, fraction = 0, message = "Number must have between 1 and 12 digits")
    private Long oauthId;
    @Pattern(regexp = "^(KAKAO)$")
    private String oauthType;


    @Builder
    public SetMemberNicknameRequest(String nickname, Long oauthId, String oauthType) {
        this.nickname = nickname;
        this.oauthId = oauthId;
        this.oauthType = oauthType;
    }
}
