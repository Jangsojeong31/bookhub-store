package com.study.bookhub_store_back.service;

import com.study.bookhub_store_back.dto.ResponseDto;

public interface MailService {

    ResponseDto<Void> sendVerificationEmail(String email, String code);
}
