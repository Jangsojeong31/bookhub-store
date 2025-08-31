package com.study.bookhub_store_back.controller;

import com.study.bookhub_store_back.dto.ResponseDto;
import com.study.bookhub_store_back.dto.payment.request.ConfirmPaymentRequestDto;
import com.study.bookhub_store_back.dto.payment.response.PaymentResponseDto;
import com.study.bookhub_store_back.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/customer/payments")
@RequiredArgsConstructor
public class PaymentController {


    private final PaymentService paymentService;

    @PostMapping("/confirm")
    public ResponseEntity<ResponseDto<PaymentResponseDto>> confirmPayment(
            @RequestBody ConfirmPaymentRequestDto request
    ) throws Exception{
        ResponseDto<PaymentResponseDto> response = paymentService.confirmPayment(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<ResponseDto<PaymentResponseDto>> getPaymentByOrderId(
            @PathVariable Long orderId
    ) throws Exception{
        ResponseDto<PaymentResponseDto> response = paymentService.getPaymentByOrderId(orderId);
        return ResponseEntity.ok(response);
    }
}
