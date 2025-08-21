package com.study.bookhub_store_back.dto.customer.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GetNicknameResponseDto {
    private String nickname;
}
