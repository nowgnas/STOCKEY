package kr.stockey.memberservice.exception;

import org.springframework.http.HttpStatus;

public interface BaseExceptionType {
    HttpStatus getHttpStatus();
    String getErrorMessage();
}