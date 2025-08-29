package com.study.bookhub_store_back.service;

import com.study.bookhub_store_back.dto.ResponseDto;
import com.study.bookhub_store_back.dto.cartItem.request.AddCartItemRequestDto;
import com.study.bookhub_store_back.dto.cartItem.request.CartItemIdRequestDto;
import com.study.bookhub_store_back.dto.cartItem.request.RemoveCartItemRequestDto;
import com.study.bookhub_store_back.dto.cartItem.response.CartItemsResponseDto;
import com.study.bookhub_store_back.security.UserPrincipal;
import org.w3c.dom.stylesheets.LinkStyle;

import java.util.List;

public interface CartService {
    ResponseDto<Void> addCartItems(UserPrincipal user, List<AddCartItemRequestDto> dto);

    ResponseDto<List<CartItemsResponseDto>> getCartItems(UserPrincipal user);

    ResponseDto<Void> changeQuantity(UserPrincipal user, Long cartItemId, int i);

    ResponseDto<Void> removeCartItems(UserPrincipal user, RemoveCartItemRequestDto dto);

    ResponseDto<List<CartItemsResponseDto>> getCartItemsToOrder(UserPrincipal user, List<CartItemIdRequestDto> dto);
}
