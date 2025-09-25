package com.study.bookhub_store_back.service;

import com.study.bookhub_store_back.dto.ResponseDto;
import com.study.bookhub_store_back.dto.auth.request.LoginRequestDto;
import com.study.bookhub_store_back.dto.auth.request.SignUpRequestDto;
import com.study.bookhub_store_back.dto.auth.request.SnsSignUpRequestDto;
import com.study.bookhub_store_back.dto.auth.response.LoginResponseDto;
import com.study.bookhub_store_back.entity.Customer;
import com.study.bookhub_store_back.security.UserPrincipal;
import jakarta.servlet.http.HttpServletResponse;

public interface AuthService {
    ResponseDto<Void> signUp(SignUpRequestDto dto);

    ResponseDto<LoginResponseDto> login(LoginRequestDto dto);

    ResponseDto<Void> logout(HttpServletResponse response);

    ResponseDto<LoginResponseDto> snsSignUp(Long userId, SnsSignUpRequestDto dto);

    ResponseDto<LoginResponseDto> snsLoginSuccess(Long userId);

    ResponseDto<Void> checkDuplicatedEmail(String email);
}
