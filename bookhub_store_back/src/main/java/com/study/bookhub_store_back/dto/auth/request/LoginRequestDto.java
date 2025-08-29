package com.study.bookhub_store_back.dto.auth.request;

import lombok.Getter;

@Getter
public class LoginRequestDto {
    private String email;
    private String password;
}
