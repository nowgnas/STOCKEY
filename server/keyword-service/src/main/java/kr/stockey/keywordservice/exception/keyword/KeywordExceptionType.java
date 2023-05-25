package kr.stockey.keywordservice.exception.keyword;

import kr.stockey.keywordservice.exception.BaseExceptionType;
import org.springframework.http.HttpStatus;

public enum KeywordExceptionType implements BaseExceptionType {

    KEYWORD_NOT_EXIST(HttpStatus.NOT_FOUND, "키워드가 존재하지 않습니다."),
    KEYPHRASE_NOT_EXIST(HttpStatus.NOT_FOUND, "키워드가 존재하지 않습니다.");

    private final HttpStatus httpStatus;
    private final String errorMessage;

    KeywordExceptionType(HttpStatus httpStatus, String errorMessage) {
        this.httpStatus = httpStatus;
        this.errorMessage = errorMessage;
    }

    @Override
    public HttpStatus getHttpStatus() {
        return this.httpStatus;
    }

    @Override
    public String getErrorMessage() {
        return this.errorMessage;
    }
}
