package com.study.bookhub_store_back.service.serviceImpl;

import com.study.bookhub_store_back.dto.ResponseDto;
import com.study.bookhub_store_back.dto.bestSeller.response.BestSellerDto;
import com.study.bookhub_store_back.repository.OrderRepository;
import com.study.bookhub_store_back.service.BestSellerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BestSellerServiceImpl implements BestSellerService {
    private final OrderRepository orderRepository;

    @Override
    public ResponseDto<List<BestSellerDto>> getBestSellersByCategory(Long categoryType) {
        String catType = categoryType == 1 ? "DOMESTIC" : "FOREIGN";
        List<BestSellerDto> responseDtos = orderRepository.findBestSellersByCategory(catType);
        return ResponseDto.success("SU", "success", responseDtos);
    }
}
