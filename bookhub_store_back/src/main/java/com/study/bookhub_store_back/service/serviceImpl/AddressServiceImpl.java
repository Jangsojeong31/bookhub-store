package com.study.bookhub_store_back.service.serviceImpl;

import com.study.bookhub_store_back.dto.ResponseDto;
import com.study.bookhub_store_back.dto.address.request.CreateAddressRequestDto;
import com.study.bookhub_store_back.dto.address.response.AddressListResponseDto;
import com.study.bookhub_store_back.entity.Customer;
import com.study.bookhub_store_back.entity.DeliveryAddress;
import com.study.bookhub_store_back.repository.AddressRepository;
import com.study.bookhub_store_back.repository.CustomerRepository;
import com.study.bookhub_store_back.security.UserPrincipal;
import com.study.bookhub_store_back.service.AddressService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {
    private final AddressRepository addressRepository;
    private final CustomerRepository customerRepository;

    // 배송지 등록
    @Override
    public ResponseDto<Void> createDeliveryAddress(UserPrincipal user, CreateAddressRequestDto dto) {
        Customer customer = customerRepository.findById(user.getCustomer().getCustomerId())
                .orElseThrow(EntityNotFoundException::new);

        DeliveryAddress address = DeliveryAddress.builder()
                .customer(customer)
                .recipientName(dto.getRecipientName())
                .phoneNumber(dto.getPhoneNumber())
                .postalCode(dto.getPostalCode())
                .fullAddress(dto.getFullAddress())
                .addressDetail(dto.getDetailAddress())
                .isDefault(false)
                .build();

        addressRepository.save(address);

        return ResponseDto.success("SU", "success");
    }

    // 배송지 목록 조회
    @Override
    public ResponseDto<List<AddressListResponseDto>> getAllAddresses(UserPrincipal user) {
        Customer customer = customerRepository.findById(user.getCustomer().getCustomerId())
                .orElseThrow(EntityNotFoundException::new);

        List<DeliveryAddress> addresses = addressRepository.findAllByCustomer(customer);

        List<AddressListResponseDto> responseDtos = addresses.stream()
                .map(a -> AddressListResponseDto.builder()
                        .id(a.getDeliveryAddressId())
                        .recipientName(a.getRecipientName())
                        .phoneNumber(a.getPhoneNumber())
                        .postalCode(a.getPostalCode())
                        .fullAddress(a.getFullAddress())
                        .detailAddress(a.getAddressDetail())
                        .defaultAddress(a.isDefault())
                        .build())
                .toList();

        return ResponseDto.success("SU", "success", responseDtos);
    }

    @Override
    public ResponseDto<Void> deleteAddress(Long addressId) {
        DeliveryAddress address = addressRepository.findById(addressId)
                .orElseThrow(EntityNotFoundException::new);

        addressRepository.delete(address);

        return ResponseDto.success("SU", "success");
    }
}
