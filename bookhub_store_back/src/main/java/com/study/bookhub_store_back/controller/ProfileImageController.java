package com.study.bookhub_store_back.controller;

import com.study.bookhub_store_back.dto.ResponseDto;
import com.study.bookhub_store_back.dto.profileImage.response.UploadProfileImageResponseDto;
import com.study.bookhub_store_back.security.CustomUserDetails;
import com.study.bookhub_store_back.service.ProfileImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/customer")
@RequiredArgsConstructor
public class ProfileImageController {
    private final ProfileImageService profileImageService;

    // 프로필 이미지 업로드
    @PostMapping("/me/profile-image/upload")
    public ResponseEntity<ResponseDto<UploadProfileImageResponseDto>> uploadProfileImage(
            @RequestParam("file") MultipartFile file,
            @AuthenticationPrincipal CustomUserDetails user
    ) {
        ResponseDto<UploadProfileImageResponseDto> response = profileImageService.uploadProfileImage(file, user);
        return ResponseEntity.ok(response);
    }
}
