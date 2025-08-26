package com.study.bookhub_store_back.dto.cartItem.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class CartItemsResponseDto {
    private Long id;
    private String isbn;
    private String title;
    private String coverImageUrl;
    private Long price;

    private int quantity;

    private Long totalPrice;
}
