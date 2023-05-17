package kr.stockey.investmentservice.exception.investment;

import kr.stockey.investmentservice.exception.BaseException;
import kr.stockey.investmentservice.exception.BaseExceptionType;

public class InvestmentException extends BaseException {
    private final BaseExceptionType exceptionType;

    public InvestmentException(BaseExceptionType exceptionType) {
        this.exceptionType = exceptionType;
    }

    @Override
    public BaseExceptionType getExceptionType() {
        return exceptionType;
    }
}
