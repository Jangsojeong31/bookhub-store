package com.study.bookhub_store_back.controller;

import com.study.bookhub_store_back.dto.ResponseDto;
import com.study.bookhub_store_back.dto.email.EmailVerifyRequestDto;
import com.study.bookhub_store_back.service.EmailVerificationService;
import com.study.bookhub_store_back.service.MailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/public/email")
@RequiredArgsConstructor
public class EmailVerificationController {
    private final MailService mailService;
    private final EmailVerificationService emailVerificationService;

    // 회원가입 시 이메일 인증을 위한 메일 전송
    @PostMapping
    public ResponseEntity<ResponseDto<Void>> sendCode(
            @RequestParam String email
    ) {
        String code = emailVerificationService.issueCode(email);
        ResponseDto<Void> responseDto = mailService.sendVerificationEmail(email, code);
        return ResponseEntity.ok(responseDto);
    }

    // 인증 번호 검증
    @PostMapping("/verification")
    public ResponseEntity<ResponseDto<Void>> verifyCode(
            @RequestBody EmailVerifyRequestDto dto
            ) {
        ResponseDto<Void> responseDto = emailVerificationService.verifyCode(dto);
        return ResponseEntity.ok(responseDto);
    }

}
