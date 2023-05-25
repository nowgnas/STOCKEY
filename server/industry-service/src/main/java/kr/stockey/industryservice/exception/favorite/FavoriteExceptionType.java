package kr.stockey.industryservice.exception.favorite;

import kr.stockey.industryservice.exception.BaseExceptionType;
import org.springframework.http.HttpStatus;

public enum FavoriteExceptionType implements BaseExceptionType {
    NOT_FOUND(HttpStatus.NOT_FOUND, "해당 즐겨찾기가 존재하지 않습니다."),
    DIFFERENT_USER(HttpStatus.BAD_REQUEST,"유저가 동일하지 않습니다."),
    ALREADY_EXIST(HttpStatus.BAD_REQUEST,"이미 즐겨찾기로 등록하였습니다.");

    private final HttpStatus httpStatus;
    private final String errorMessage;

    FavoriteExceptionType(HttpStatus httpStatus, String errorMessage) {
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
