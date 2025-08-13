package com.study.bookhub_store_back.entity;

import com.study.bookhub_store_back.common.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "customers")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Customer extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long customerId;

    @Column(unique = true)
    private String email;
    private String password;
    @Column(nullable = false)
    private String nickname;
    private String phoneNumber;
    private String profileImageUrl;

    @Column(nullable = false)
    private String role;
//    private DeliveryAddress defaultAddress;

    private String socialProvider;
    private String socialId;
}
