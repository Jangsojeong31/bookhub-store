package com.study.bookhub_store_back.security.oauth2;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.study.bookhub_store_back.dto.auth.response.LoginResponseDto;
import com.study.bookhub_store_back.entity.Customer;
import com.study.bookhub_store_back.repository.CustomerRepository;
import com.study.bookhub_store_back.security.UserPrincipal;
import com.study.bookhub_store_back.security.jwt.JwtProvider;
import com.study.bookhub_store_back.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Base64;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtProvider jwtProvider;
    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        String userId = userPrincipal.getUserId().toString();

        if (userPrincipal.isNewUser()) {
            // 회원가입 추가 정보 입력 페이지로 이동
            response.sendRedirect("http://localhost:5173/sns-sign-up?userId=" + userId);

        } else {
            // 로그인
            response.sendRedirect("http://localhost:5173/login/success?userId=" + userId);
            System.out.println("sns 로그인 성공");
        }
    }
}
