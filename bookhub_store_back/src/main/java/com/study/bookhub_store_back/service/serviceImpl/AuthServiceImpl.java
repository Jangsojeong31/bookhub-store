package com.study.bookhub_store_back.service.serviceImpl;

import com.study.bookhub_store_back.dto.ResponseDto;
import com.study.bookhub_store_back.dto.auth.request.LoginRequestDto;
import com.study.bookhub_store_back.dto.auth.request.SignUpRequestDto;
import com.study.bookhub_store_back.dto.auth.request.SnsSignUpRequestDto;
import com.study.bookhub_store_back.dto.auth.response.CustomerResponseDto;
import com.study.bookhub_store_back.dto.auth.response.LoginResponseDto;
import com.study.bookhub_store_back.entity.Customer;
import com.study.bookhub_store_back.repository.CustomerRepository;
import com.study.bookhub_store_back.security.UserPrincipal;
import com.study.bookhub_store_back.security.jwt.JwtProvider;
import com.study.bookhub_store_back.service.AuthService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtProvider jwtProvider;

    // 회원가입
    @Override
    public ResponseDto<Void> signUp(SignUpRequestDto dto) {
        Customer existingCustomer = customerRepository.findByEmail(dto.getEmail());
        if (existingCustomer != null) throw new IllegalArgumentException("이미 존재하는 회원입니다.");

        Customer newCustomer = Customer.builder()
                .email(dto.getEmail())
                .password(passwordEncoder.encode(dto.getPassword()))
                .name(dto.getName())
                .phoneNumber(dto.getPhone())
                .role("USER")
                .isDeleted(false)
                .build();

        customerRepository.save(newCustomer);

        return ResponseDto.success("SU", "success");
    }

    // 로그인
    @Override
    public ResponseDto<LoginResponseDto> login(LoginRequestDto dto) {
        String email = dto.getEmail();
        String password = dto.getPassword();
        System.out.println(password);

        // 탈퇴 유무 확인
        Customer customer = customerRepository.findByEmail(email);
        if (customer.isDeleted()) throw new IllegalArgumentException("탈퇴한 회원입니다.");

        // 로그인 인증
        Authentication authentication;

        try {
            authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        } catch (AuthenticationException e) {
            throw new RuntimeException(e);
        }

        UserPrincipal userDetails = (UserPrincipal) authentication.getPrincipal();

        Customer user = customerRepository.findByEmail(userDetails.getUsername());

        String token = jwtProvider.generateJwtToken(authentication);
        int exprTime = jwtProvider.getExpiration();

        CustomerResponseDto userDto = CustomerResponseDto.builder()
                .id(user.getCustomerId())
                .email(user.getEmail())
                .name(user.getName())
                .nickname(user.getNickname())
                .phoneNumber(user.getPhoneNumber())
                .profileImageUrl(user.getProfileImageUrl())
                .socialProvider(user.getSocialProvider())
                .socialId(user.getSocialId())
                .build();

        LoginResponseDto responseDto = LoginResponseDto.builder()
                .token(token)
                .exprTime(exprTime)
                .user(userDto)
                .build();

        return ResponseDto.success("SU", "success", responseDto);
    }

    // 로그아웃
    @Override
    public ResponseDto<Void> logout(HttpServletResponse response) {
        ResponseCookie accessTokenCookie = ResponseCookie.from("accessToken", "")
                .path("/")
                .maxAge(0)
                .build();

        response.addHeader("Set-Cookie", accessTokenCookie.toString());

        return ResponseDto.success("SU", "success");
    }

    // 추가 정보 입력 후 회원가입 -> 로그인
    @Override
    public ResponseDto<LoginResponseDto> snsSignUp(Long userId, SnsSignUpRequestDto dto) {
        Customer customer = customerRepository.findById(userId)
                .orElseThrow(EntityNotFoundException::new);

        customer.setEmail(dto.getEmail());
        customer.setPhoneNumber(dto.getPhone());
        customer.setName(dto.getName());

        customerRepository.save(customer);

        UserPrincipal userPrincipal = UserPrincipal.create(customer);

        LoginResponseDto responseDto = generateTokenForSnsLogin(userPrincipal, customer);

        return ResponseDto.success("SU", "success", responseDto);
    }

    // 소셜 로그인
    @Override
    public ResponseDto<LoginResponseDto> snsLoginSuccess(Long userId) {
        Customer customer = customerRepository.findById(userId)
                .orElseThrow(EntityNotFoundException::new);

        UserPrincipal userPrincipal = UserPrincipal.create(customer);

        LoginResponseDto responseDto = generateTokenForSnsLogin(userPrincipal, customer);

        return ResponseDto.success("SU", "success", responseDto);
    }

    // 소셜 로그인 토큰 발급 메서드
    public LoginResponseDto generateTokenForSnsLogin(UserPrincipal userPrincipal, Customer customer) {
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                userPrincipal,
                null,
                userPrincipal.getAuthorities()
        );

        String token = jwtProvider.generateJwtToken(authentication);
        int exprTime = jwtProvider.getExpiration();

        CustomerResponseDto userDto = CustomerResponseDto.builder()
                .id(customer.getCustomerId())
                .email(customer.getEmail())
                .name(customer.getName())
                .nickname(customer.getNickname())
                .phoneNumber(customer.getPhoneNumber())
                .profileImageUrl(customer.getProfileImageUrl())
                .socialProvider(customer.getSocialProvider())
                .socialId(customer.getSocialId())
                .build();

        LoginResponseDto responseDto = LoginResponseDto.builder()
                .token(token)
                .exprTime(exprTime)
                .user(userDto)
                .build();

        return responseDto;
    }
}
