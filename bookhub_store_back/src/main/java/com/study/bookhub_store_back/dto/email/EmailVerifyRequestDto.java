package com.study.bookhub_store_back.dto.email;

import lombok.Getter;

@Getter
public class EmailVerifyRequestDto {
    private String email;
    private String code;
}
