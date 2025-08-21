package com.study.bookhub_store_back.service;

import com.study.bookhub_store_back.dto.ResponseDto;
import com.study.bookhub_store_back.dto.profileImage.response.UploadProfileImageResponseDto;
import com.study.bookhub_store_back.security.CustomUserDetails;
import org.springframework.web.multipart.MultipartFile;

public interface ProfileImageService {
    ResponseDto<UploadProfileImageResponseDto> uploadProfileImage(MultipartFile file, CustomUserDetails user);
}
