package kr.stockey.keywordservice.exception.keyword;

import kr.stockey.keywordservice.exception.BaseException;
import kr.stockey.keywordservice.exception.BaseExceptionType;

public class KeywordException extends BaseException {
    private final BaseExceptionType exceptionType;

    public KeywordException(BaseExceptionType exceptionType) {
        this.exceptionType = exceptionType;
    }

    @Override
    public BaseExceptionType getExceptionType() {
        return exceptionType;
    }
}
