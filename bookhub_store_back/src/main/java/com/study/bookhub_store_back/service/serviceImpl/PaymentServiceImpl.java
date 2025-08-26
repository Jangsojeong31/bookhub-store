package com.study.bookhub_store_back.service.serviceImpl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.study.bookhub_store_back.common.enums.OrderStatus;
import com.study.bookhub_store_back.common.enums.PaymentStatus;
import com.study.bookhub_store_back.dto.ResponseDto;
import com.study.bookhub_store_back.dto.payment.request.ConfirmPaymentRequestDto;
import com.study.bookhub_store_back.dto.payment.response.PaymentResponseDto;
import com.study.bookhub_store_back.entity.Order;
import com.study.bookhub_store_back.entity.Payment;
import com.study.bookhub_store_back.repository.OrderRepository;
import com.study.bookhub_store_back.repository.PaymentRepository;
import com.study.bookhub_store_back.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {
    @Value("${tossPayments_SECRET_KEY}")
    private String secretKey;

    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;

    @Override
    @Transactional
    public ResponseDto<PaymentResponseDto> confirmPayment(ConfirmPaymentRequestDto request) {
        // 데이터 무결성 검사
        Order order = orderRepository.findByOrderNumber(request.getOrderId())
                .orElseThrow(() -> new IllegalArgumentException("해당 주문 건 없음"));

        if (!order.getTotalAmount().equals(Long.valueOf(request.getAmount()))) {
            throw new IllegalArgumentException("결제 금액 불일치");
        } else {
            // Payment 엔티티 생성 (REQUESTED 상태)
            Payment payment = Payment.builder()
                    .paymentKey(request.getPaymentKey())
                    .amount(Long.valueOf(request.getAmount()))
                    .status(PaymentStatus.REQUESTED)
                    .order(order)
                    .orderNumber(request.getOrderId())
                    .requestedAt(LocalDateTime.now())
                    .build();

            paymentRepository.save(payment);

            // 결제 승인 API 요청
            String encodedKey = Base64.getEncoder().encodeToString((secretKey + ":").getBytes(StandardCharsets.UTF_8));

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Authorization", "Basic " + encodedKey);

            Map<String, Object> body = new HashMap<>();
            body.put("paymentKey", request.getPaymentKey());
            body.put("orderId", request.getOrderId());
            body.put("amount", request.getAmount());

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<String> response = restTemplate.postForEntity(
                    "https://api.tosspayments.com/v1/payments/confirm",
                    entity,
                    String.class
            );

            try {
                // 응답 파싱
                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode jsonNode = objectMapper.readTree(response.getBody());

                // 실패 시
                if (jsonNode.has("code")) {
                    payment.setStatus(PaymentStatus.FAILED);
                    order.setStatus(OrderStatus.FAILED);
                    return ResponseDto.fail(jsonNode.get("code").asText(), jsonNode.get("message").asText());
                }

                // 성공 시
                payment.setStatus(PaymentStatus.SUCCESS);
                String approvedAt = jsonNode.get("approvedAt").asText();
                payment.setApprovedAt(LocalDateTime.parse(approvedAt, DateTimeFormatter.ISO_OFFSET_DATE_TIME));
                payment.setPaymentMethod(jsonNode.get("method").asText());

                order.setStatus(OrderStatus.PAID);

                // dto 변한
                PaymentResponseDto responseDto = PaymentResponseDto.builder()
                        .paymentId(payment.getPaymentId())
                        .paymentKey(payment.getPaymentKey())
                        .paymentMethod(payment.getPaymentMethod())
                        .amount(payment.getAmount())
                        .status(payment.getStatus())
                        .orderNumber(payment.getOrderNumber())
                        .orderName(payment.getOrder().getOrderName())
                        .requestedAt(payment.getRequestedAt())
                        .approvedAt(payment.getApprovedAt())
                        .build();

                return ResponseDto.success("SU", "success", responseDto);

            } catch (Exception e){
                payment.setStatus(PaymentStatus.FAILED);
                order.setStatus(OrderStatus.FAILED);
                throw new RuntimeException("결제 승인 처리 중 오류", e);
            }
        }
    }
}
