package com.study.bookhub_store_back.service;

import com.study.bookhub_store_back.dto.ResponseDto;
import com.study.bookhub_store_back.dto.payment.request.ConfirmPaymentRequestDto;
import com.study.bookhub_store_back.dto.payment.response.PaymentResponseDto;

public interface PaymentService {
    ResponseDto<PaymentResponseDto> confirmPayment(ConfirmPaymentRequestDto request);
}
