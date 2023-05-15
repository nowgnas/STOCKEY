package kr.stockey.stockservice.exception.stock;

import kr.stockey.stockservice.exception.BaseException;
import kr.stockey.stockservice.exception.BaseExceptionType;

public class StockException extends BaseException {
    private final BaseExceptionType exceptionType;

    public StockException(BaseExceptionType exceptionType) {
        this.exceptionType = exceptionType;
    }

    @Override
    public BaseExceptionType getExceptionType() {
        return exceptionType;
    }
}
