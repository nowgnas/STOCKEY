package kr.stockey.industryservice.exception.favorite;


import kr.stockey.industryservice.exception.BaseException;
import kr.stockey.industryservice.exception.BaseExceptionType;

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
