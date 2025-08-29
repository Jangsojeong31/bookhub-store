package com.study.bookhub_store_back.service.serviceImpl;

import com.study.bookhub_store_back.dto.ResponseDto;
import com.study.bookhub_store_back.dto.auth.response.CustomerResponseDto;
import com.study.bookhub_store_back.dto.customer.request.UpdateCustomerInfoRequestDto;
import com.study.bookhub_store_back.dto.customer.request.UpdateNicknameRequestDto;
import com.study.bookhub_store_back.dto.customer.request.UpdatePasswordRequestDto;
import com.study.bookhub_store_back.dto.customer.request.UpdateProfileImageRequestDto;
import com.study.bookhub_store_back.dto.customer.response.CustomerInfoResponseDto;
import com.study.bookhub_store_back.dto.customer.response.GetNicknameResponseDto;
import com.study.bookhub_store_back.dto.customer.response.GetProfileImageResponseDto;
import com.study.bookhub_store_back.entity.Customer;
import com.study.bookhub_store_back.repository.CustomerRepository;
import com.study.bookhub_store_back.security.UserPrincipal;
import com.study.bookhub_store_back.service.CustomerService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {
    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public ResponseDto<CustomerInfoResponseDto> getCustomerInfo(UserPrincipal user) {
        String email = user.getUsername();
        String phoneNumber = user.getPhoneNumber();

        CustomerInfoResponseDto responseDto = CustomerInfoResponseDto.builder()
                .email(email)
                .phoneNumber(phoneNumber)
                .build();

        return ResponseDto.success("SU", "success", responseDto);
    }

    @Override
    public ResponseDto<Void> updateCustomerInfo(UserPrincipal user, UpdateCustomerInfoRequestDto requestDto) {
        Customer customer = customerRepository.findByEmail(user.getUsername());

        String email = requestDto.getEmail();
        String phoneNumber = requestDto.getPhoneNumber();

        customer.setEmail(email);
        customer.setPhoneNumber(phoneNumber);

        customerRepository.save(customer);

        return ResponseDto.success("success", "success");
    }

    @Override
    public ResponseDto<Void> updatePassword(UserPrincipal user, UpdatePasswordRequestDto requestDto) {
        Customer customer = customerRepository.findByEmail(user.getUsername());

        String password = requestDto.getPassword();

        customer.setPassword(passwordEncoder.encode(password));

        customerRepository.save(customer);

        return ResponseDto.success("success", "success");
    }

    @Override
    public ResponseDto<Void> updateProfileImage(UserPrincipal user, UpdateProfileImageRequestDto requestDto) {
        Customer customer = customerRepository.findByEmail(user.getUsername());

        String profileImageUrl = requestDto.getProfileImageUrl();

        customer.setProfileImageUrl(profileImageUrl);

        customerRepository.save(customer);

        return ResponseDto.success("success", "success");
    }

    @Override
    public ResponseDto<Void> updateNickname(UserPrincipal user, UpdateNicknameRequestDto requestDto) {
        Customer customer = customerRepository.findByEmail(user.getUsername());

        String nickname = requestDto.getNickname();

        customer.setNickname(nickname);

        customerRepository.save(customer);

        return ResponseDto.success("success", "success");
    }

    @Override
    public ResponseDto<GetNicknameResponseDto> getMyNickname(UserPrincipal user) {
        String nickname = user.getCustomer().getNickname();

        GetNicknameResponseDto responseDto = GetNicknameResponseDto.builder().nickname(nickname).build();

        return ResponseDto.success("success", "success", responseDto);
    }

    @Override
    public ResponseDto<GetProfileImageResponseDto> getMyProfileImage(UserPrincipal user) {
        String profileImage = user.getCustomer().getProfileImageUrl();

        GetProfileImageResponseDto responseDto = GetProfileImageResponseDto.builder().profileImage(profileImage).build();

        return ResponseDto.success("success", "success", responseDto);
    }

    @Override
    public ResponseDto<CustomerResponseDto> getUserInfoById(Long userId) {
        Customer customer = customerRepository.findById(userId)
                .orElseThrow(EntityNotFoundException::new);

        CustomerResponseDto responseDto = CustomerResponseDto.builder()
                .email(customer.getEmail())
                .name(customer.getName())
                .phoneNumber(customer.getPhoneNumber())
                .build();

        return ResponseDto.success("SU", "success", responseDto);
    }
}
