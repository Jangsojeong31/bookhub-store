package com.study.bookhub_store_back.service;

import com.study.bookhub_store_back.common.enums.OrderStatus;
import com.study.bookhub_store_back.dto.ResponseDto;
import com.study.bookhub_store_back.dto.order.request.CreateOrderRequestDto;
import com.study.bookhub_store_back.entity.Customer;
import com.study.bookhub_store_back.entity.Order;
import com.study.bookhub_store_back.entity.OrderDetail;
import com.study.bookhub_store_back.entity.product.Book;
import com.study.bookhub_store_back.repository.BookRepository;
import com.study.bookhub_store_back.repository.CustomerRepository;
import com.study.bookhub_store_back.repository.OrderRepository;
import com.study.bookhub_store_back.security.CustomUserDetails;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService{
    private final OrderRepository orderRepository;
    private final CustomerRepository customerRepository;
    private final BookRepository bookRepository;

    // 요청 주문건 생성 (status = PENDING)
    @Override
    @Transactional
    public ResponseDto<Void> createOrder(CustomUserDetails user, CreateOrderRequestDto dto) {
        Customer customer = customerRepository.findById(user.getCustomer().getCustomerId())
                .orElseThrow(EntityNotFoundException::new);

        List<OrderDetail> orderDetails = new ArrayList<>();

        Order newOrder = Order.builder()
                .orderNumber(dto.getOrderNumber())
                .orderName(dto.getOrderName())
                .orderDetails(orderDetails)
                .customer(customer)
                .address(0L)
                .totalAmount(dto.getTotalAmount())
                .orderDate(LocalDateTime.now())
                .status(OrderStatus.PENDING)
                .build();


        for (CreateOrderRequestDto.OrderItems item : dto.getItems()) {
            Book book = bookRepository.findById(item.getIsbn())
                    .orElseThrow(EntityNotFoundException::new);

            OrderDetail detail = OrderDetail.builder()
                    .book(book)
                    .bookPrice(item.getBookPrice())
                    .quantity(item.getQuantity())
                    .totalPrice(item.getTotalPrice())
                    .build();

            newOrder.addOrderDetail(detail);
        }

        orderRepository.save(newOrder);
        return null;
    }
}
