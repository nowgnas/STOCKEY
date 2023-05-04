package kr.stockey.memberservice.exception.jwt;

import kr.stockey.memberservice.exception.BaseExceptionType;
import org.springframework.http.HttpStatus;

public enum JwtExceptionType implements BaseExceptionType {

    TOKEN_NULL(HttpStatus.UNAUTHORIZED, "토큰 정보가 없습니다."),
    NOT_START_WITH_BEARER(HttpStatus.UNAUTHORIZED, "토큰이 'Bearer '로 시작하지 않습니다."),
    TOKEN_TOO_SHORT(HttpStatus.UNAUTHORIZED, "토큰의 길이가 너무 짧습니다."),
    TOKEN_EXPIRED(HttpStatus.UNAUTHORIZED, "토큰이 만료되었습니다."),
    JWT_VERIFICATION_EXCEPTION(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다."),
    DECODE_FAIL(HttpStatus.UNAUTHORIZED, "토큰 해독 실패, 비정상적인 토큰입니다."),
    TOKEN_SAVE_FAIL(HttpStatus.INTERNAL_SERVER_ERROR, "토큰 저장 실패");

    private final HttpStatus httpStatus;
    private final String errorMessage;

    JwtExceptionType(HttpStatus httpStatus, String errorMessage) {
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
