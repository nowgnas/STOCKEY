package kr.stockey.keywordservice.api.response;

import kr.stockey.keywordservice.dto.TopKeywordDTO;
import lombok.Data;

import java.util.List;

@Data
public class GetTopNKeywordResponse {
    private final Long totalNewsCount;
    private final List<TopKeywordDTO> topKeywordDTO;
}
