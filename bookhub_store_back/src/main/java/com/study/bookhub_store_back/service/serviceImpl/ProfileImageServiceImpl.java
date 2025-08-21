package com.study.bookhub_store_back.service.serviceImpl;

import com.study.bookhub_store_back.dto.ResponseDto;
import com.study.bookhub_store_back.dto.profileImage.response.UploadProfileImageResponseDto;
import com.study.bookhub_store_back.entity.Customer;
import com.study.bookhub_store_back.repository.CustomerRepository;
import com.study.bookhub_store_back.security.CustomUserDetails;
import com.study.bookhub_store_back.service.ProfileImageService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Objects;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProfileImageServiceImpl implements ProfileImageService {

    private final CustomerRepository customerRepository;

    @Value("${file.upload.path}")
    private String uploadDir;

    @Override
    public ResponseDto<UploadProfileImageResponseDto> uploadProfileImage(MultipartFile file, CustomUserDetails user) {
        if(file.isEmpty()) {
            throw new IllegalStateException("파일이 비어 있습니다.");
        }

        String fileType = file.getContentType();
        if (fileType == null || !fileType.startsWith("image/")) {
            throw new IllegalArgumentException("이미지 파일만 업로드 가능합니다.");
        }

        try {
            String originalFilename = file.getOriginalFilename();
            String newFilename = UUID.randomUUID() + "_" + originalFilename;

            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Path filePath = uploadPath.resolve(newFilename);
            file.transferTo(filePath.toFile());

            String imageUrl = "/files/" + newFilename;

            Customer customer = customerRepository.findById(user.getCustomer().getCustomerId())
                    .orElseThrow(() -> new EntityNotFoundException("회원 없음"));
            customer.setProfileImageUrl(imageUrl);
            customerRepository.save(customer);

            UploadProfileImageResponseDto responseDto = new UploadProfileImageResponseDto(imageUrl);

            return ResponseDto.success("success", "success", responseDto);
        } catch (IOException e) {
            throw new RuntimeException("프로필 이미지 업로드 실패", e);
        }
    }
}
