package kr.stockey.memberservice.exception.member;

import kr.stockey.memberservice.exception.BaseExceptionType;
import org.springframework.http.HttpStatus;

public enum AuthExceptionType  implements BaseExceptionType {
    INCORRECT_KAKAO_AUTH_CODE(HttpStatus.BAD_REQUEST, "적절하지 않은 카카오 인증 코드입니다.");

    private final HttpStatus httpStatus;
    private final String errorMessage;

    AuthExceptionType(HttpStatus httpStatus, String errorMessage) {
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
