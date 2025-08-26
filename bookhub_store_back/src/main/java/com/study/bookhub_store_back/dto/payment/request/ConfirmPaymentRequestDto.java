package com.study.bookhub_store_back.dto.payment.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ConfirmPaymentRequestDto {
    private String paymentKey;
    private String orderId;
    private String amount;
}
