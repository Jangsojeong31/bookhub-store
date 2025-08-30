package com.study.bookhub_store_back.service;

import com.study.bookhub_store_back.dto.ResponseDto;
import com.study.bookhub_store_back.dto.bestSeller.response.BestSellerDto;

import java.util.List;

public interface BestSellerService {
    ResponseDto<List<BestSellerDto>> getBestSellersByCategory(Long categoryType);
}
