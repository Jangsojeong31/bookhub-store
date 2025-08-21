package com.study.bookhub_store_back.service;

import com.study.bookhub_store_back.dto.ResponseDto;
import com.study.bookhub_store_back.dto.customer.request.UpdateCustomerInfoRequestDto;
import com.study.bookhub_store_back.dto.customer.request.UpdateNicknameRequestDto;
import com.study.bookhub_store_back.dto.customer.request.UpdatePasswordRequestDto;
import com.study.bookhub_store_back.dto.customer.request.UpdateProfileImageRequestDto;
import com.study.bookhub_store_back.dto.customer.response.CustomerInfoResponseDto;
import com.study.bookhub_store_back.dto.customer.response.GetNicknameResponseDto;
import com.study.bookhub_store_back.dto.customer.response.GetProfileImageResponseDto;
import com.study.bookhub_store_back.security.CustomUserDetails;
import com.study.bookhub_store_back.security.oauth2.CustomOAuth2User;

public interface CustomerService {
    ResponseDto<CustomerInfoResponseDto> getCustomerInfo(CustomUserDetails user);

    ResponseDto<Void> updateCustomerInfo(CustomUserDetails user, UpdateCustomerInfoRequestDto requestDto);

    ResponseDto<Void> updatePassword(CustomUserDetails user, UpdatePasswordRequestDto requestDto);

    ResponseDto<Void> updateProfileImage(CustomUserDetails user, UpdateProfileImageRequestDto requestDto);

    ResponseDto<Void> updateNickname(CustomUserDetails user, UpdateNicknameRequestDto requestDto);

    ResponseDto<GetNicknameResponseDto> getMyNickname(CustomUserDetails user);

    ResponseDto<GetProfileImageResponseDto> getMyProfileImage(CustomUserDetails user);
}
