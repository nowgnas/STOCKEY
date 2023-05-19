package kr.stockey.newsservice.exception.stock;

import kr.stockey.newsservice.exception.BaseExceptionType;
import org.springframework.http.HttpStatus;

public enum DailyStockExceptionType implements BaseExceptionType {


    NOT_FOUND(HttpStatus.NOT_FOUND, "최신 종목이 존재하지 않습니다.");


    private final HttpStatus httpStatus;
    private final String errorMessage;

    DailyStockExceptionType(HttpStatus httpStatus, String errorMessage) {
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
