package kr.stockey.memberservice.exception.member;

import kr.stockey.memberservice.exception.BaseExceptionType;
import org.springframework.http.HttpStatus;

public enum MemberExceptionType implements BaseExceptionType {

    ALREADY_EXIST_NICKNAME(HttpStatus.BAD_REQUEST, "이미 존재하는 닉네임입니다."),
    NOT_FOUND_MEMBER(HttpStatus.NOT_FOUND, "회원 정보가 없습니다."),
    SAME_NICKNAME(HttpStatus.BAD_REQUEST, "수정 전 닉네임과 동일합니다."),
    OAUTH_TOKEN_ERROR(HttpStatus.BAD_REQUEST, "잘못된 oAuth token 입니다.");

    private final HttpStatus httpStatus;
    private final String errorMessage;

    MemberExceptionType(HttpStatus httpStatus, String errorMessage) {
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
