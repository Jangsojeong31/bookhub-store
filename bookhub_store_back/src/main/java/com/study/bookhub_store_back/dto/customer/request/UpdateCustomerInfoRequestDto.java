package com.study.bookhub_store_back.dto.customer.request;

import lombok.Getter;

@Getter
public class UpdateCustomerInfoRequestDto {
    private String email;
    private String name;
    private String phoneNumber;
}
