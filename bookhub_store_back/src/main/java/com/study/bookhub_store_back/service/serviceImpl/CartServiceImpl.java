package com.study.bookhub_store_back.service.serviceImpl;

import com.study.bookhub_store_back.dto.ResponseDto;
import com.study.bookhub_store_back.dto.cartItem.request.AddCartItemRequestDto;
import com.study.bookhub_store_back.dto.cartItem.request.CartItemIdRequestDto;
import com.study.bookhub_store_back.dto.cartItem.request.RemoveCartItemRequestDto;
import com.study.bookhub_store_back.dto.cartItem.response.CartItemsResponseDto;
import com.study.bookhub_store_back.entity.Cart;
import com.study.bookhub_store_back.entity.CartItem;
import com.study.bookhub_store_back.entity.product.Book;
import com.study.bookhub_store_back.repository.BookRepository;
import com.study.bookhub_store_back.repository.CartItemRepository;
import com.study.bookhub_store_back.repository.CartRepository;
import com.study.bookhub_store_back.security.CustomUserDetails;
import com.study.bookhub_store_back.service.CartService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final BookRepository bookRepository;


    @Override
    @Transactional
    public ResponseDto<Void> addCartItems(CustomUserDetails user, List<AddCartItemRequestDto> dto) {

        Cart cart = cartRepository.findByCustomer(user.getCustomer())
                .orElseGet(() -> cartRepository.save(new Cart(user.getCustomer())));

        for (AddCartItemRequestDto request : dto) {
            Book book = bookRepository.findById(request.getIsbn())
                    .orElseThrow(EntityNotFoundException::new);

            Optional<CartItem> existingItem = cartItemRepository.findByCartAndBook(cart, book);

            existingItem.ifPresentOrElse(
                   item ->  updateQuantity(item, request.getQuantity()),
                    () -> cart.addItem(CartItem.builder()
                            .book(book)
                            .quantity(request.getQuantity())
                            .build())
            );
        }

        return ResponseDto.success("success", "장바구니 담기 성공");
    }



    @Override
    @Transactional
    public ResponseDto<List<CartItemsResponseDto>> getCartItems(CustomUserDetails user) {
        Cart cart = cartRepository.findByCustomer(user.getCustomer())
                .orElseThrow(EntityNotFoundException::new);

        List<CartItem> items = cart.getItems();

        List<CartItemsResponseDto> responseDtos = items.stream()
                .map(item -> {
                    Book book = item.getBook();

                    return CartItemsResponseDto.builder()
                            .id(item.getCartItemId())
                            .isbn(book.getBookIsbn())
                            .title(book.getBookTitle())
                            .price(book.getBookPrice())
                            .coverImageUrl(book.getCoverImage() == null ? null : book.getCoverImage().getFilePath())
                            .quantity(item.getQuantity())
                            .totalPrice(item.getQuantity() * book.getBookPrice())
                            .build();
                })
                .toList();

        return ResponseDto.success("success", "success", responseDtos);
    }

    @Override
    @Transactional
    public ResponseDto<Void> changeQuantity(CustomUserDetails user, Long cartItemId, int i) {

        Cart cart = cartRepository.findById(user.getCartId())
                .orElseThrow(() -> new EntityNotFoundException("Cart not found"));

        CartItem item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new EntityNotFoundException("CartItem not found"));

        if (!item.getCart().getCartId().equals(cart.getCartId())) {
            throw new IllegalArgumentException("해당 상품은 사용자의 장바구니에 없는 상품입니다.");
        }

        updateQuantity(item, i);

        return ResponseDto.success("success", "수량 변경 성공");
    }

    @Override
    @Transactional
    public ResponseDto<Void> removeCartItems(CustomUserDetails user, RemoveCartItemRequestDto dto) {
        Cart cart = cartRepository.findById(user.getCartId())
                .orElseThrow(() -> new EntityNotFoundException("Cart not found"));

        List<Long> cartItemIds = dto.getCartItemIds();

        List<CartItem> items = cartItemRepository.findAllById(cartItemIds)
                .stream()
                .filter(item -> item.getCart().getCartId().equals(cart.getCartId()))
                .toList();

        for (CartItem item : items) cart.removeItem(item);

        return ResponseDto.success("success", "장바구니 상품 삭제 완료");
    }

    @Override
    @Transactional
    public ResponseDto<List<CartItemsResponseDto>> getCartItemsToOrder(CustomUserDetails user, List<CartItemIdRequestDto> dto) {

        List<Long> cartItemIds = dto.stream()
                .map(CartItemIdRequestDto::getCartItemId)
                .toList();

        List<CartItem> items = cartItemRepository.findAllById(cartItemIds);

        List<CartItemsResponseDto> responseDtos = items.stream()
                .map(item -> {
                    Book book = item.getBook();

                    return CartItemsResponseDto.builder()
                            .id(item.getCartItemId())
                            .title(book.getBookTitle())
                            .price(book.getBookPrice())
                            .coverImageUrl(book.getCoverImage() == null ? null : book.getCoverImage().getFilePath())
                            .quantity(item.getQuantity())
                            .totalPrice(item.getQuantity() * book.getBookPrice())
                            .build();
                })
                .toList();

        return ResponseDto.success("success", "success", responseDtos);
    }

    private void updateQuantity(CartItem cartItem, int quantity) {
        int newQuantity = cartItem.getQuantity() + quantity;

        if (newQuantity < 1) throw new IllegalArgumentException("수량은 최소 1 이상이어야 합니다.");

        cartItem.setQuantity(newQuantity);
    }
}
