package kr.stockey.industryservice.exception.industry;

import kr.stockey.industryservice.exception.BaseExceptionType;
import org.springframework.http.HttpStatus;

public enum IndustryExceptionType  implements BaseExceptionType {

    NOT_FOUND(HttpStatus.NOT_FOUND, "해당 산업이 존재하지 않습니다.");

    private final HttpStatus httpStatus;
    private final String errorMessage;

    IndustryExceptionType(HttpStatus httpStatus, String errorMessage) {
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
