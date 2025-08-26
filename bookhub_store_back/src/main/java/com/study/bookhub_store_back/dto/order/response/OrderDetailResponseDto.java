package com.study.bookhub_store_back.dto.order.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class OrderDetailResponseDto {
    private Long orderDetailId;
    private String coverUrl;
    private String bookTitle;
    private Long bookPrice;
    private Long quantity;
    private Long totalPrice;
}
