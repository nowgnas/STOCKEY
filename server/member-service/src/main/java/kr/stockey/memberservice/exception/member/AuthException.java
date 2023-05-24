package kr.stockey.memberservice.exception.member;

import kr.stockey.memberservice.exception.BaseException;
import kr.stockey.memberservice.exception.BaseExceptionType;

public class AuthException extends BaseException {
    private final BaseExceptionType exceptionType;

    public AuthException(BaseExceptionType exceptionType) {
        this.exceptionType = exceptionType;
    }

    @Override
    public BaseExceptionType getExceptionType() {
        return exceptionType;
    }
}
