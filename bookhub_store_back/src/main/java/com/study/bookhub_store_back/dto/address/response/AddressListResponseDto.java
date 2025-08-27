package com.study.bookhub_store_back.dto.address.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@AllArgsConstructor
@Getter
public class AddressListResponseDto {
    private Long id;
    private String recipientName;
    private String phoneNumber;
    private String postalCode;
    private String fullAddress;
    private String detailAddress;
    private boolean defaultAddress;
}
