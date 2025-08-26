package com.study.bookhub_store_back.service;

import com.study.bookhub_store_back.dto.ResponseDto;
import com.study.bookhub_store_back.dto.order.request.CreateOrderRequestDto;
import com.study.bookhub_store_back.security.CustomUserDetails;

public interface OrderService {
    ResponseDto<Void> createOrder(CustomUserDetails user, CreateOrderRequestDto dto);
}
