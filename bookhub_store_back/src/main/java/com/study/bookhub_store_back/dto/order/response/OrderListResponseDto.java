package com.study.bookhub_store_back.dto.order.response;

import com.study.bookhub_store_back.common.enums.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class OrderListResponseDto {
    private Long orderId;
    private String orderNumber;
    private String orderName;
    private String customerEmail;
    private String address;
    private Long totalAmount;
    private String paymentMethod;
    private LocalDateTime orderDate;
    private OrderStatus status;

    private List<OrderDetailResponseDto> orderDetails;
}
