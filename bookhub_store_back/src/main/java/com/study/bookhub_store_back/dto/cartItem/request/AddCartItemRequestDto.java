package com.study.bookhub_store_back.dto.cartItem.request;

import com.study.bookhub_store_back.entity.product.Book;
import lombok.Getter;

@Getter
public class AddCartItemRequestDto {
    private String isbn;
    private int quantity;
}
