package kr.stockey.favoriteservice.exception.favorite;


import kr.stockey.favoriteservice.exception.BaseException;
import kr.stockey.favoriteservice.exception.BaseExceptionType;

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
