package com.study.bookhub_store_back.dto.order.request;

import com.study.bookhub_store_back.entity.Order;
import lombok.Getter;

import java.util.List;

@Getter
public class CreateOrderRequestDto {
    private String orderNumber;
    private String orderName;
    private Long totalAmount;
    private Long addressId;

    private List<OrderItems> items;

    @Getter
    public static class OrderItems {
        private String isbn;
        private Long bookPrice;
        private Long quantity;
        private Long totalPrice;
    }
}
