package kr.stockey.memberservice.exception.jwt;


import kr.stockey.memberservice.exception.BaseException;
import kr.stockey.memberservice.exception.BaseExceptionType;

public class JwtException extends BaseException {
    private final BaseExceptionType exceptionType;

    public JwtException(BaseExceptionType exceptionType) {
        this.exceptionType = exceptionType;
    }

    @Override
    public BaseExceptionType getExceptionType() {
        return exceptionType;
    }
}
