package com.study.bookhub_store_back.service;

import com.study.bookhub_store_back.dto.ResponseDto;
import com.study.bookhub_store_back.dto.address.request.CreateAddressRequestDto;
import com.study.bookhub_store_back.dto.address.response.AddressListResponseDto;
import com.study.bookhub_store_back.security.CustomUserDetails;

import java.util.List;

public interface AddressService
{
    ResponseDto<Void> createDeliveryAddress(CustomUserDetails user, CreateAddressRequestDto dto);

    ResponseDto<List<AddressListResponseDto>> getAllAddresses(CustomUserDetails user);
}
