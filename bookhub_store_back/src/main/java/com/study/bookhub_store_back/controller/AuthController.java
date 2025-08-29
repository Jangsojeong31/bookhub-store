package com.study.bookhub_store_back.controller;

import com.study.bookhub_store_back.dto.ResponseDto;
import com.study.bookhub_store_back.dto.auth.request.LoginRequestDto;
import com.study.bookhub_store_back.dto.auth.request.SignUpRequestDto;
import com.study.bookhub_store_back.dto.auth.response.LoginResponseDto;
import com.study.bookhub_store_back.service.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/customer/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/sign-up")
    public ResponseEntity<ResponseDto<Void>> signUp(
        @RequestBody SignUpRequestDto dto
    ){
        ResponseDto<Void> responseDto = authService.signUp(dto);
        return ResponseEntity.ok(responseDto);
    }

    @PostMapping("/login")
    public ResponseEntity<ResponseDto<LoginResponseDto>> login(
            @RequestBody LoginRequestDto dto
    ){
        ResponseDto<LoginResponseDto> responseDto = authService.login(dto);
        return ResponseEntity.ok((responseDto));
    }

    @PostMapping("/logout")
    public ResponseEntity<ResponseDto<Void>> logout (HttpServletResponse response) {
        ResponseDto<Void> responseDto = authService.logout(response);
        return ResponseEntity.ok(responseDto);
    }
}
