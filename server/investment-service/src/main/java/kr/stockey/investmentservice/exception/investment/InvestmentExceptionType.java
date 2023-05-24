package kr.stockey.investmentservice.exception.investment;

import kr.stockey.investmentservice.exception.BaseExceptionType;
import org.springframework.http.HttpStatus;

public enum InvestmentExceptionType implements BaseExceptionType {

    NOT_ORDERING_TIME(HttpStatus.BAD_REQUEST, "주문 가능한 시간이 아닙니다."),
    NO_OWNED_STOCK(HttpStatus.NO_CONTENT, "보유한 주식이 없습니다."),
    NO_USER_RANK(HttpStatus.NO_CONTENT, "해당 유저의 랭킹 정보가 없습니다."),
    NO_ORDER_HISTORY(HttpStatus.NO_CONTENT, "주문 기록이 없습니다.");

    private final HttpStatus httpStatus;
    private final String errorMessage;

    InvestmentExceptionType(HttpStatus httpStatus, String errorMessage) {
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
