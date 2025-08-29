package com.study.bookhub_store_back.service;

import com.study.bookhub_store_back.dto.ResponseDto;
import com.study.bookhub_store_back.dto.auth.response.CustomerResponseDto;
import com.study.bookhub_store_back.dto.customer.request.UpdateCustomerInfoRequestDto;
import com.study.bookhub_store_back.dto.customer.request.UpdateNicknameRequestDto;
import com.study.bookhub_store_back.dto.customer.request.UpdatePasswordRequestDto;
import com.study.bookhub_store_back.dto.customer.request.UpdateProfileImageRequestDto;
import com.study.bookhub_store_back.dto.customer.response.CustomerInfoResponseDto;
import com.study.bookhub_store_back.dto.customer.response.GetNicknameResponseDto;
import com.study.bookhub_store_back.dto.customer.response.GetProfileImageResponseDto;
import com.study.bookhub_store_back.security.UserPrincipal;

public interface CustomerService {
    ResponseDto<CustomerInfoResponseDto> getCustomerInfo(UserPrincipal user);

    ResponseDto<Void> updateCustomerInfo(UserPrincipal user, UpdateCustomerInfoRequestDto requestDto);

    ResponseDto<Void> updatePassword(UserPrincipal user, UpdatePasswordRequestDto requestDto);

    ResponseDto<Void> updateProfileImage(UserPrincipal user, UpdateProfileImageRequestDto requestDto);

    ResponseDto<Void> updateNickname(UserPrincipal user, UpdateNicknameRequestDto requestDto);

    ResponseDto<GetNicknameResponseDto> getMyNickname(UserPrincipal user);

    ResponseDto<GetProfileImageResponseDto> getMyProfileImage(UserPrincipal user);

    ResponseDto<CustomerResponseDto> getUserInfoById(Long userId);
}
