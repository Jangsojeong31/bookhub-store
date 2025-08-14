package com.study.bookhub_store_back.entity.product;

import com.study.bookhub_store_back.common.enums.PolicyType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "discount_policies")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class DiscountPolicy {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "policy_id")
    private Long policyId;

    @Column(name = "policy_title", nullable = false)
    private String policyTitle;

    @Lob
    @Column(name = "policy_description", nullable = false)
    private String policyDescription;

    @Enumerated(EnumType.STRING)
    @Column(name = "policy_type", nullable = false)
    private PolicyType policyType;

    @Column(name = "total_price_achieve")
    private Integer totalPriceAchieve;

    @Column(name = "discount_percent", nullable = false)
    private Integer discountPercent;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;
}
