package kr.stockey.keywordservice.handler;

import kr.stockey.keywordservice.dto.core.ErrorResultDto;
import kr.stockey.keywordservice.dto.core.ResponseDto;
import kr.stockey.keywordservice.exception.BaseException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;
import java.util.stream.Collectors;

@RestControllerAdvice
@Slf4j
public class GlobalExControllerAdvice {


    // Bean Validation Handler
    @ExceptionHandler
    public Object memberValidError(MethodArgumentNotValidException e){
        List<ErrorResultDto> collect = e.getAllErrors().stream().map(o -> (FieldError) o)
                .map(o -> new ErrorResultDto(o.getField(), o.getDefaultMessage()))
                .collect(Collectors.toList());
        return collect;
    }

    @ExceptionHandler
    public ResponseEntity<ResponseDto> classCastEx(ClassCastException ex){
        log.error("[ClassCastException] handler");
        ResponseDto responseDTO = ResponseDto.builder()
                .message(ex.getMessage())
                .build();
        return new ResponseEntity<>(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
    }


    @ExceptionHandler
    public ResponseEntity<ResponseDto> handleBaseEx(BaseException exception){
        log.error("BaseException errorMessage(): {}",exception.getExceptionType().getErrorMessage());
        log.error("BaseException HttpStatus(): {}",exception.getExceptionType().getHttpStatus());
        ResponseDto responseDTO = ResponseDto.builder()
                .message(exception.getExceptionType().getErrorMessage())
                .build();
        return new ResponseEntity<>(responseDTO, exception.getExceptionType().getHttpStatus());
    }


    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ResponseDto> handleIllegalArgumentEx(IllegalArgumentException exception) {
        ResponseDto responseDTO = ResponseDto.builder()
                .message(exception.getMessage())
                .build();
        return new ResponseEntity<>(responseDTO, HttpStatus.BAD_REQUEST);
    }
}
