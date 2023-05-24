package kr.stockey.newsservice.exception;

public abstract class BaseException extends RuntimeException {
    public abstract BaseExceptionType getExceptionType();
}
