package com.study.bookhub_store_back.repository;

import com.study.bookhub_store_back.entity.Cart;
import com.study.bookhub_store_back.entity.CartItem;
import com.study.bookhub_store_back.entity.product.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    Optional<CartItem> findByCartAndBook(Cart cart, Book book);
}
