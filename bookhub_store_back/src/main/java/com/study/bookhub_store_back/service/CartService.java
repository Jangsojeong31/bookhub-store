package com.study.bookhub_store_back.service;

import com.study.bookhub_store_back.dto.ResponseDto;
import com.study.bookhub_store_back.dto.cartItem.request.AddCartItemRequestDto;
import com.study.bookhub_store_back.dto.cartItem.request.CartItemIdRequestDto;
import com.study.bookhub_store_back.dto.cartItem.request.RemoveCartItemRequestDto;
import com.study.bookhub_store_back.dto.cartItem.response.CartItemsResponseDto;
import com.study.bookhub_store_back.security.CustomUserDetails;
import org.w3c.dom.stylesheets.LinkStyle;

import java.util.List;

public interface CartService {
    ResponseDto<Void> addCartItems(CustomUserDetails user, List<AddCartItemRequestDto> dto);

    ResponseDto<List<CartItemsResponseDto>> getCartItems(CustomUserDetails user);

    ResponseDto<Void> changeQuantity(CustomUserDetails user, Long cartItemId, int i);

    ResponseDto<Void> removeCartItems(CustomUserDetails user, RemoveCartItemRequestDto dto);

    ResponseDto<List<CartItemsResponseDto>> getCartItemsToOrder(CustomUserDetails user, List<CartItemIdRequestDto> dto);
}
