package com.study.bookhub_store_back.service;

import com.study.bookhub_store_back.dto.ResponseDto;
import com.study.bookhub_store_back.dto.email.EmailVerifyRequestDto;

public interface EmailVerificationService {
    String issueCode(String email);

    ResponseDto<Void> verifyCode(EmailVerifyRequestDto dto);
}
