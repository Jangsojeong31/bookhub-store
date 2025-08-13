package com.study.bookhub_store_back.security.oauth2;

import com.study.bookhub_store_back.entity.Customer;
import com.study.bookhub_store_back.repository.CustomerRepository;
import com.study.bookhub_store_back.security.jwt.JwtProvider;
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
        CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();

        // 회원가입
        if(!oAuth2User.isExisted()) {
            customerRepository.save(Customer.builder()
                    .email(oAuth2User.getEmail())
                    .password(passwordEncoder.encode(oAuth2User.getPassword()))
                    .phoneNumber(oAuth2User.getPhoneNumber())
                    .nickname(oAuth2User.getNickname())
                    .profileImageUrl(oAuth2User.getProfileImage())
                    .role("USER")
                    .socialId(oAuth2User.getSocialId())
                    .socialProvider(oAuth2User.getSocialProvider())
                    .build());

            System.out.println("회원가입 성공");
        }

        // 로그인
        String token = jwtProvider.generateJwtToken(authentication);
        int expiration = jwtProvider.getExpiration();

        System.out.println("AccessToken : " + token);
        System.out.println("Expiration : " + expiration);
        String[] chunks = token.split("\\.");
        String payload = new String(Base64.getUrlDecoder().decode(chunks[1]));
        System.out.println(payload);
        System.out.println("sns 로그인 성공");

//        response.sendRedirect("http://localhost:3000/sns-success?accessToken=" + token + "&expiration=" + expiration);
    }
}
