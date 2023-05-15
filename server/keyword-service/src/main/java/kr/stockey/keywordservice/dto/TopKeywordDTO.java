package kr.stockey.keywordservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TopKeywordDTO {
    Long keywordId;
    Long keywordCount;
    String keywordName;
}
