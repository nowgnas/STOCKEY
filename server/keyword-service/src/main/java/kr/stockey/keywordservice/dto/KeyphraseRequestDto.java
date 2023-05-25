package kr.stockey.keywordservice.dto;

import kr.stockey.keywordservice.api.request.GetKeyphraseRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class KeyphraseRequestDto {
    private Long memberId;
    private Long keywordsId;
    private GetKeyphraseRequest getKeyphraseRequest;
}
