package com.study.bookhub_store_back.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ResponseDto<T> {

    private String code;
    private String message;
    private T data;

    public static <T> ResponseDto<T> success(String code, String message, T data) {
        return new ResponseDto<>(code, message, data);
    }

    public static <T> ResponseDto<T> success(String code, String message) {
        return new ResponseDto<>(code, message, null);
    }

    public static <T> ResponseDto<T> fail(String code, String message) {
        return new ResponseDto<>(code, message, null);
    }
}
