package com.study.bookhub_store_back.service;

import com.study.bookhub_store_back.dto.ResponseDto;
import com.study.bookhub_store_back.dto.order.request.CreateOrderRequestDto;
import com.study.bookhub_store_back.dto.order.response.OrderListResponseDto;
import com.study.bookhub_store_back.security.UserPrincipal;

import java.util.List;

public interface OrderService {
    ResponseDto<Void> createOrder(UserPrincipal user, CreateOrderRequestDto dto);

    ResponseDto<List<OrderListResponseDto>> getOrders(UserPrincipal user);
}
