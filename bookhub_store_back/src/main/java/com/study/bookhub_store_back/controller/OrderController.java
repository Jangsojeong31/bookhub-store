package com.study.bookhub_store_back.controller;

import com.study.bookhub_store_back.dto.ResponseDto;
import com.study.bookhub_store_back.dto.order.request.CreateOrderRequestDto;
import com.study.bookhub_store_back.dto.order.response.OrderListResponseDto;
import com.study.bookhub_store_back.security.CustomUserDetails;
import com.study.bookhub_store_back.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/customer/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    // 요청 주문건 생성 (status = PENDING)
    @PostMapping
    public ResponseEntity<ResponseDto<Void>> createOrder(
            @AuthenticationPrincipal CustomUserDetails user,
            @RequestBody CreateOrderRequestDto dto
    ) {
        ResponseDto<Void> response = orderService.createOrder(user, dto);
        return ResponseEntity.ok(response);
    }

    // 주문 내역 조회
    @GetMapping
    public ResponseEntity<ResponseDto<List<OrderListResponseDto>>> getOrders(
            @AuthenticationPrincipal CustomUserDetails user
    ) {
        ResponseDto<List<OrderListResponseDto>> response = orderService.getOrders(user);
        return ResponseEntity.ok(response);
    }
//
//    // 주문 상세 조회
//    @GetMapping("/{orderId}/detail")
//    public ResponseEntity<ResponseDto<List<OrderDetailsResponseDto>>> getOrderDetails(
//            @AuthenticationPrincipal CustomUserDetails user,
//            @PathVariable Long orderId
//    ) {
//        ResponseDto<List<OrderDetailsResponseDto>> response = orderService.getOrderDetails(user, orderId);
//        return ResponseEntity.ok(response);
//    }


}
