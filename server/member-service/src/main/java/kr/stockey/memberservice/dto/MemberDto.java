package kr.stockey.memberservice.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;



@Builder
@Getter
@ToString
@NoArgsConstructor
public class MemberDto {
    Long id;
    String nickname;

    public void setId(Long id) {
        if(id>=0){
            this.id = id;
        }
    }
    public void setNickname(String nickname) {
        if(nickname!=null){
            this.nickname = nickname;
        }
    }

    @Builder
    public MemberDto(Long id, String nickname) {
        setId(id);
        setNickname(nickname);
    }
}
