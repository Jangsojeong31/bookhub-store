package com.study.bookhub_store_back.controller;

import com.study.bookhub_store_back.dto.ResponseDto;
import com.study.bookhub_store_back.dto.customer.request.UpdateCustomerInfoRequestDto;
import com.study.bookhub_store_back.dto.customer.request.UpdateNicknameRequestDto;
import com.study.bookhub_store_back.dto.customer.request.UpdatePasswordRequestDto;
import com.study.bookhub_store_back.dto.customer.request.UpdateProfileImageRequestDto;
import com.study.bookhub_store_back.dto.customer.response.CustomerInfoResponseDto;
import com.study.bookhub_store_back.security.CustomUserDetails;
import com.study.bookhub_store_back.security.oauth2.CustomOAuth2User;
import com.study.bookhub_store_back.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/customer")
@RequiredArgsConstructor
public class CustomerController {
    private final CustomerService customerService;

    // 회원 정보 불러오기 (이메일, 전화번호)
    @GetMapping("/me/info")
    public ResponseEntity<ResponseDto<CustomerInfoResponseDto>> getCustomerInfo(
            @AuthenticationPrincipal CustomUserDetails user
    ) {
        ResponseDto<CustomerInfoResponseDto> responseDto = customerService.getCustomerInfo(user);
        return ResponseEntity.ok(responseDto);
    }

    // 회원 정보 수정
    @PutMapping("/me/info")
    public ResponseEntity<ResponseDto<Void>> updateCustomerInfo(
            @AuthenticationPrincipal CustomUserDetails user,
            @RequestBody UpdateCustomerInfoRequestDto requestDto
    ) {
        ResponseDto<Void> responseDto = customerService.updateCustomerInfo(user, requestDto);
        return ResponseEntity.ok(responseDto);
    }

    // 비밀번호 수정
    @PutMapping("/me/info/password")
    public ResponseEntity<ResponseDto<Void>> updatePassword(
            @AuthenticationPrincipal CustomUserDetails user,
            @RequestBody UpdatePasswordRequestDto requestDto
    ) {
        ResponseDto<Void> responseDto = customerService.updatePassword(user, requestDto);
        return ResponseEntity.ok(responseDto);
    }

    // 프로필 이미지 수정
    @PutMapping("/me/profile-image")
    public ResponseEntity<ResponseDto<Void>> updateProfileImage(
            @AuthenticationPrincipal CustomUserDetails user,
            @RequestBody UpdateProfileImageRequestDto requestDto
    ) {
        ResponseDto<Void> responseDto = customerService.updateProfileImage(user, requestDto);
        return ResponseEntity.ok(responseDto);
    }

    // 닉네임 변경
    @PutMapping("/me/nickname")
    public ResponseEntity<ResponseDto<Void>> updateNickname(
            @AuthenticationPrincipal CustomUserDetails user,
            @RequestBody UpdateNicknameRequestDto requestDto
    ) {
        ResponseDto<Void> responseDto = customerService.updateNickname(user, requestDto);
        return ResponseEntity.ok(responseDto);
    }

    // 회원 탈퇴
}
