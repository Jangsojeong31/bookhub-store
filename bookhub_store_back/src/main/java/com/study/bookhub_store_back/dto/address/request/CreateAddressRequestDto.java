package com.study.bookhub_store_back.dto.address.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateAddressRequestDto {
    private String recipientName;
    private String phoneNumber;
    private String postalCode;
    private String fullAddress;
    private String detailAddress;
}
