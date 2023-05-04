package com.ssafy.backend.global.exception.jwt;


import com.ssafy.backend.global.exception.BaseException;
import com.ssafy.backend.global.exception.BaseExceptionType;

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
