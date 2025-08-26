package com.study.bookhub_store_back.repository;

import com.study.bookhub_store_back.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Optional<Order> findByOrderNumber(String orderNumber);

    List<Order> findByCustomer_CustomerIdOrderByOrderDateDesc(Long customerCustomerId);
}
