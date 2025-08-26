package com.study.bookhub_store_back.dto.cartItem.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RemoveCartItemRequestDto {
    private List<Long> cartItemIds;
}
