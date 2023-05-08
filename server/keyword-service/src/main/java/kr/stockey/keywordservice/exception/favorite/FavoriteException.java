package kr.stockey.keywordservice.exception.favorite;

import com.ssafy.backend.global.exception.BaseException;
import com.ssafy.backend.global.exception.BaseExceptionType;

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
