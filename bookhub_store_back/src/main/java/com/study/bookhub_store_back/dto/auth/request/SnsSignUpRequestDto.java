package com.study.bookhub_store_back.dto.auth.request;

import lombok.Getter;

@Getter
public class SnsSignUpRequestDto {
    private String email;
    private String name;
    private String phone;
}
