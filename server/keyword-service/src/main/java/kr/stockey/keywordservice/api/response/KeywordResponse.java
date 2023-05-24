package kr.stockey.keywordservice.api.response;

import lombok.Data;

@Data
public class KeywordResponse {
    private final long id;
    private final String name;
    private final String description;
}
