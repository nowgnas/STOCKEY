package kr.stockey.keywordservice.dto.core;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;


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
