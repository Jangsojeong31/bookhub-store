package com.study.bookhub_store_back.controller;

import com.study.bookhub_store_back.dto.ResponseDto;
import com.study.bookhub_store_back.dto.address.request.CreateAddressRequestDto;
import com.study.bookhub_store_back.dto.address.response.AddressListResponseDto;
import com.study.bookhub_store_back.security.UserPrincipal;
import com.study.bookhub_store_back.service.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user/address")
@RequiredArgsConstructor
public class AddressController {
    private final AddressService addressService;

    // 배송지 등록
    @PostMapping
    public ResponseEntity<ResponseDto<Void>> createDeliveryAddress(
            @AuthenticationPrincipal UserPrincipal user,
            @RequestBody CreateAddressRequestDto dto
    ) {
        ResponseDto<Void> responseDto = addressService.createDeliveryAddress(user, dto);
        return ResponseEntity.ok(responseDto);
    }
    
    // 배송지 목록 조회
    @GetMapping
    public ResponseEntity<ResponseDto<List<AddressListResponseDto>>> getAllAddresses(
            @AuthenticationPrincipal UserPrincipal user
    ) {
        ResponseDto<List<AddressListResponseDto>> responseDto = addressService.getAllAddresses(user);
        return ResponseEntity.ok(responseDto);
    }

    // 배송지 삭제
    @DeleteMapping("/{addressId}")
    public ResponseEntity<ResponseDto<Void>> deleteAddress(
            @PathVariable Long addressId
    ) {
        ResponseDto<Void> responseDto = addressService.deleteAddress(addressId);
        return ResponseEntity.ok(responseDto);
    }
    // 기본 배송지로 변경

}
