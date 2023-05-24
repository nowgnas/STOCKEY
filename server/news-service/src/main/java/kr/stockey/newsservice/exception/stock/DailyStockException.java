package kr.stockey.newsservice.exception.stock;


import kr.stockey.newsservice.exception.BaseException;
import kr.stockey.newsservice.exception.BaseExceptionType;

public class DailyStockException extends BaseException {
    private final BaseExceptionType exceptionType;

    public DailyStockException(BaseExceptionType exceptionType) {
        this.exceptionType = exceptionType;
    }

    @Override
    public BaseExceptionType getExceptionType() {
        return exceptionType;
    }

}
