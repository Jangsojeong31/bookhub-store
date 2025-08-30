package com.study.bookhub_store_back.controller;

import com.study.bookhub_store_back.dto.ResponseDto;
import com.study.bookhub_store_back.dto.auth.request.LoginRequestDto;
import com.study.bookhub_store_back.dto.auth.request.SignUpRequestDto;
import com.study.bookhub_store_back.dto.auth.request.SnsSignUpRequestDto;
import com.study.bookhub_store_back.dto.auth.response.LoginResponseDto;
import com.study.bookhub_store_back.service.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/customer/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    // 일반 회원가입
    @PostMapping("/sign-up")
    public ResponseEntity<ResponseDto<Void>> signUp(
        @RequestBody SignUpRequestDto dto
    ){
        ResponseDto<Void> responseDto = authService.signUp(dto);
        return ResponseEntity.ok(responseDto);
    }

    // 일반 로그인
    @PostMapping("/login")
    public ResponseEntity<ResponseDto<LoginResponseDto>> login(
            @RequestBody LoginRequestDto dto
    ){
        ResponseDto<LoginResponseDto> responseDto = authService.login(dto);
        return ResponseEntity.ok((responseDto));
    }

    // Sns 신규 가입
    @PutMapping("/{userId}/sns-sign-up")
    public ResponseEntity<ResponseDto<LoginResponseDto>> snsSignUp(
            @PathVariable Long userId,
            @RequestBody SnsSignUpRequestDto dto
    ) {
        ResponseDto<LoginResponseDto> responseDto = authService.snsSignUp(userId, dto);
        return ResponseEntity.ok(responseDto);
    }

    // Sns 로그인
    @PostMapping("/{userId}/sns-login")
    public ResponseEntity<ResponseDto<LoginResponseDto>> snsLogin(
            @PathVariable Long userId
    ){
        ResponseDto<LoginResponseDto> responseDto = authService.snsLoginSuccess(userId);
        return ResponseEntity.ok((responseDto));
    }

    // 로그아웃
    @PostMapping("/logout")
    public ResponseEntity<ResponseDto<Void>> logout (HttpServletResponse response) {
        ResponseDto<Void> responseDto = authService.logout(response);
        return ResponseEntity.ok(responseDto);
    }
}
