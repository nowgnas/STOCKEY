package kr.stockey.industryservice.exception.industry;


import kr.stockey.industryservice.exception.BaseException;
import kr.stockey.industryservice.exception.BaseExceptionType;

public class IndustryException  extends BaseException {
    private final BaseExceptionType exceptionType;

    public IndustryException(BaseExceptionType exceptionType) {
        this.exceptionType = exceptionType;
    }

    @Override
    public BaseExceptionType getExceptionType() {
        return exceptionType;
    }
}
