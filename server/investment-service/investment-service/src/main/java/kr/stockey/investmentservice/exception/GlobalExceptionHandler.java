package kr.stockey.investmentservice.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
    @ExceptionHandler
    public void handleBaseExTest(Exception exception){
        System.out.println("exception = " + exception);
        System.out.println("exception.getMessage() = " + exception.getMessage());
    }

}
