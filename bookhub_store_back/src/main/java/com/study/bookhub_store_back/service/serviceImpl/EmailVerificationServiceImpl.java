package com.study.bookhub_store_back.service.serviceImpl;

import com.study.bookhub_store_back.dto.ResponseDto;
import com.study.bookhub_store_back.dto.email.EmailVerifyRequestDto;
import com.study.bookhub_store_back.entity.EmailVerification;
import com.study.bookhub_store_back.repository.CustomerRepository;
import com.study.bookhub_store_back.repository.EmailVerificationRepository;
import com.study.bookhub_store_back.service.EmailVerificationService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class EmailVerificationServiceImpl implements EmailVerificationService {

    private final EmailVerificationRepository emailVerificationRepository;
    private final CustomerRepository customerRepository;

    // 인증번호 생성 메서드
    private String createCode() {
        Random random = new SecureRandom();
        StringBuilder code = new StringBuilder();

        for (int i = 0; i < 6; i++) {
            code.append(random.nextInt(10));
        }

        return code.toString();
    }

    // 인증번호 발급 + 임시 저장
    @Override
    public String issueCode(String email) {

        String code = createCode();

        EmailVerification verification = EmailVerification.builder()
                .email(email)
                .code(code)
                .createdAt(LocalDateTime.now())
                .build();

        emailVerificationRepository.save(verification);

        return code;
    }

    // 인증 번호 일치 여부 확인
    @Override
    public ResponseDto<Void> verifyCode(EmailVerifyRequestDto dto) {
        EmailVerification verification = emailVerificationRepository.findById(dto.getEmail())
                .orElseThrow(EntityNotFoundException::new);

        if (Duration.between(verification.getCreatedAt(), LocalDateTime.now()).toMinutes() >= 5) {
            emailVerificationRepository.delete(verification);
            throw new IllegalArgumentException("인증 시간이 초과되었습니다.");
        }

        if (!verification.getCode().equals(dto.getCode())) throw new IllegalArgumentException("인증번호가 일치하지 않습니다.");

        emailVerificationRepository.delete(verification);

        return ResponseDto.success("SU", "이메일 인증에 성공하였습니다.");
    }
}
