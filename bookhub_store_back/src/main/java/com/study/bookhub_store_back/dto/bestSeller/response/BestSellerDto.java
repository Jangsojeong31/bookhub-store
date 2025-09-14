package com.study.bookhub_store_back.dto.bestSeller.response;

import lombok.*;

import java.math.BigInteger;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class BestSellerDto {
    private String isbn;
    private String bookTitle;
    private String author;
    private String publisher;
    private LocalDate publishedDate;
    private Long bookPrice;
    private Long discountRate;
    private String coverImageUrl;
    private String description;
    private String categoryName;
    private Long totalSales;
}

