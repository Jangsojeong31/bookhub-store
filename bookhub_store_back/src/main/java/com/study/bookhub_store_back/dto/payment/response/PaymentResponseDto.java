package com.study.bookhub_store_back.dto.payment.response;

import com.study.bookhub_store_back.common.enums.PaymentStatus;
import com.study.bookhub_store_back.entity.Order;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class PaymentResponseDto {
    private Long paymentId;
    private String paymentKey;
    private String paymentMethod;
    private Long amount;
    private String status;
    private String orderNumber;
    private String orderName;
    private LocalDateTime requestedAt;
    private LocalDateTime approvedAt;
}
