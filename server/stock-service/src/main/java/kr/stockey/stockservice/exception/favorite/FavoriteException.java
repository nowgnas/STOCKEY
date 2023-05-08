package kr.stockey.stockservice.exception.favorite;


import kr.stockey.stockservice.exception.BaseException;
import kr.stockey.stockservice.exception.BaseExceptionType;

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
