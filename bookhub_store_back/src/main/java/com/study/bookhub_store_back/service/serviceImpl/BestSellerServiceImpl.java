package com.study.bookhub_store_back.service.serviceImpl;

import com.study.bookhub_store_back.dto.ResponseDto;
import com.study.bookhub_store_back.dto.bestSeller.response.BestSellerDto;
import com.study.bookhub_store_back.dto.bestSeller.response.BestSellerProjection;
import com.study.bookhub_store_back.repository.OrderDetailRepository;
import com.study.bookhub_store_back.repository.OrderRepository;
import com.study.bookhub_store_back.service.BestSellerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BestSellerServiceImpl implements BestSellerService {
    private final OrderDetailRepository orderDetailRepository;

    @Override
    public ResponseDto<List<BestSellerProjection>> getBestSellersByCategory(Long categoryType) {
        String catType = categoryType == 1 ? "DOMESTIC" : "FOREIGN";
        List<BestSellerProjection> responseDtos = orderDetailRepository.findBestSellersByCategory(catType);
        return ResponseDto.success("SU", "success", responseDtos);
    }
}
