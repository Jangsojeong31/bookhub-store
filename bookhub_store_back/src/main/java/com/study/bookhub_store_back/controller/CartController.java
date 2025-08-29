package com.study.bookhub_store_back.controller;

import com.study.bookhub_store_back.dto.ResponseDto;
import com.study.bookhub_store_back.dto.cartItem.request.AddCartItemRequestDto;
import com.study.bookhub_store_back.dto.cartItem.request.CartItemIdRequestDto;
import com.study.bookhub_store_back.dto.cartItem.request.RemoveCartItemRequestDto;
import com.study.bookhub_store_back.dto.cartItem.response.CartItemsResponseDto;
import com.study.bookhub_store_back.security.UserPrincipal;
import com.study.bookhub_store_back.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/customer")
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService;

    // 장바구니 담기
    @PostMapping("/cart/items")
    public ResponseEntity<ResponseDto<Void>> addCartItems(
            @AuthenticationPrincipal UserPrincipal user,
            @RequestBody List<AddCartItemRequestDto> dto
        ) {
        ResponseDto<Void> responseDto = cartService.addCartItems(user, dto);
        return ResponseEntity.ok(responseDto);
    }

    // 장바구니 목록 조회
    @GetMapping("/cart/items")
    public ResponseEntity<ResponseDto<List<CartItemsResponseDto>>> getCartItems(
            @AuthenticationPrincipal UserPrincipal user
    ) {
        ResponseDto<List<CartItemsResponseDto>> responseDto = cartService.getCartItems(user);
        return ResponseEntity.ok(responseDto);
    }

    // 장바구니에서 선택한 목록 조회 (주문페이지)
    @GetMapping("/cart/ordering-items")
    public ResponseEntity<ResponseDto<List<CartItemsResponseDto>>> getCartItemsToOrder(
            @AuthenticationPrincipal UserPrincipal user,
            @RequestBody List<CartItemIdRequestDto> dto
    ) {
        ResponseDto<List<CartItemsResponseDto>> responseDto = cartService.getCartItemsToOrder(user, dto);
        return ResponseEntity.ok(responseDto);
    }

    // 장바구니 수량 변경 - 증가
    @PutMapping("/cart/items/{cartItemId}/increase")
    public ResponseEntity<ResponseDto<Void>> increaseQuantity(
            @AuthenticationPrincipal UserPrincipal user,
            @PathVariable Long cartItemId
    ) {
        ResponseDto<Void> responseDto = cartService.changeQuantity(user, cartItemId, 1);
        return ResponseEntity.ok(responseDto);
    }

    // 장바구니 수량 변경 - 감소
    @PutMapping("/cart/items/{cartItemId}/decrease")
    public ResponseEntity<ResponseDto<Void>> decreaseQuantity(
            @AuthenticationPrincipal UserPrincipal user,
            @PathVariable Long cartItemId
    ) {
        ResponseDto<Void> responseDto = cartService.changeQuantity(user, cartItemId, -1);
        return ResponseEntity.ok(responseDto);
    }

    // 장바구니 아이템 삭제 (개별 삭제 / 주문 시 장바구니 비우기)
    @PostMapping("/cart/remove")
    public ResponseEntity<ResponseDto<Void>> removeCartItems(
            @AuthenticationPrincipal UserPrincipal user,
            @RequestBody RemoveCartItemRequestDto dto
    ) {
        ResponseDto<Void> responseDto = cartService.removeCartItems(user, dto);
        return ResponseEntity.ok(responseDto);
    }

}
