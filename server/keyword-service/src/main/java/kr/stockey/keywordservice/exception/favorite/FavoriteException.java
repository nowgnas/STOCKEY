package kr.stockey.keywordservice.exception.favorite;


import kr.stockey.keywordservice.exception.BaseException;
import kr.stockey.keywordservice.exception.BaseExceptionType;

public class FavoriteException extends BaseException {
    private final BaseExceptionType exceptionType;

    public FavoriteException(BaseExceptionType exceptionType) {
        this.exceptionType = exceptionType;
    }

    @Override
    public BaseExceptionType getExceptionType() {
        return exceptionType;
    }
}
