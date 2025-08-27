package com.study.bookhub_store_back.service.serviceImpl;

import com.study.bookhub_store_back.common.enums.OrderStatus;
import com.study.bookhub_store_back.dto.ResponseDto;
import com.study.bookhub_store_back.dto.order.request.CreateOrderRequestDto;
import com.study.bookhub_store_back.dto.order.response.OrderDetailResponseDto;
import com.study.bookhub_store_back.dto.order.response.OrderListResponseDto;
import com.study.bookhub_store_back.entity.*;
import com.study.bookhub_store_back.entity.product.Book;
import com.study.bookhub_store_back.repository.*;
import com.study.bookhub_store_back.security.CustomUserDetails;
import com.study.bookhub_store_back.service.OrderService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final CustomerRepository customerRepository;
    private final BookRepository bookRepository;
    private final OrderDetailRepository orderDetailRepository;
    private final PaymentRepository paymentRepository;
    private final AddressRepository addressRepository;

    // 요청 주문건 생성 (status = PENDING)
    @Override
    @Transactional
    public ResponseDto<Void> createOrder(CustomUserDetails user, CreateOrderRequestDto dto) {
        Customer customer = customerRepository.findById(user.getCustomer().getCustomerId())
                .orElseThrow(EntityNotFoundException::new);

        DeliveryAddress address = addressRepository.findById(dto.getAddressId())
                .orElseThrow(EntityNotFoundException::new);

        List<OrderDetail> orderDetails = new ArrayList<>();

        Order newOrder = Order.builder()
                .orderNumber(dto.getOrderNumber())
                .orderName(dto.getOrderName())
                .orderDetails(orderDetails)
                .customer(customer)
                .deliveryAddress(address)
                .recipientName(address.getRecipientName())
                .phoneNumber(address.getPhoneNumber())
                .postalCode(address.getPostalCode())
                .fullAddress(address.getFullAddress())
                .addressDetail(address.getAddressDetail())
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

    // 주문 내역 목록
    @Override
    public ResponseDto<List<OrderListResponseDto>> getOrders(CustomUserDetails user) {
        Customer customer = customerRepository.findById(user.getCustomer().getCustomerId())
                .orElseThrow(EntityNotFoundException::new);

        List<Order> orders = orderRepository.findByCustomer_CustomerIdOrderByOrderDateDesc(customer.getCustomerId());
        List<OrderListResponseDto> responseDtos = new ArrayList<>();

        for (Order order : orders) {
            List<OrderDetail> orderDetails = orderDetailRepository.findAllByOrder_OrderId(order.getOrderId());
            Payment payment = paymentRepository.findByOrderNumber(order.getOrderNumber());

            List<OrderDetailResponseDto> detailResponseDtos = orderDetails.stream()
                            .map(detail -> OrderDetailResponseDto.builder()
                                    .orderDetailId(detail.getOrderDetailId())
                                    .bookTitle(detail.getBook().getBookTitle())
                                    .coverUrl(detail.getBook().getCoverImage() != null ? detail.getBook().getCoverImage().getFilePath() : null)
                                    .bookPrice(detail.getBookPrice())
                                    .quantity(detail.getQuantity())
                                    .totalPrice(detail.getTotalPrice())
                                    .build())
                            .toList();

            responseDtos.add(
                    OrderListResponseDto.builder()
                            .orderId(order.getOrderId())
                            .orderNumber(order.getOrderNumber())
                            .orderName(order.getOrderName())
                            .orderDate(order.getOrderDate())
                            .orderDetails(detailResponseDtos)
                            .paymentMethod(payment == null
                                    ? null
                                    : payment.getPaymentMethod() == null ? null : payment.getPaymentMethod())
                            .recipientName(order.getRecipientName())
                            .phoneNumber(order.getPhoneNumber())
                            .fullAddress(order.getFullAddress())
                            .addressDetail(order.getAddressDetail())
                            .status(order.getStatus())
                            .totalAmount(order.getTotalAmount())
                            .build()
            );
        }

        return ResponseDto.success("SU", "success", responseDtos);
    }
}
