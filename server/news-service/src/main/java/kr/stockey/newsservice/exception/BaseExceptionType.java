package kr.stockey.newsservice.exception;

import org.springframework.http.HttpStatus;

public interface BaseExceptionType {
    HttpStatus getHttpStatus();
    String getErrorMessage();
}