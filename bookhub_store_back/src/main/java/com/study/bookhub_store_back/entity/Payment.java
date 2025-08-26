package com.study.bookhub_store_back.entity;

import com.study.bookhub_store_back.common.BaseTimeEntity;
import com.study.bookhub_store_back.common.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Payment extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentId;

    @Column(nullable = false, unique = true)
    private String paymentKey;
    private String paymentMethod;
    @Column(nullable = false)
    private Long amount;
    @Column(nullable = false)
    private String status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;
    @Column(nullable = false)
    private String orderNumber;

    @Column(nullable = false)
    private LocalDateTime requestedAt;
    private LocalDateTime approvedAt;
}
