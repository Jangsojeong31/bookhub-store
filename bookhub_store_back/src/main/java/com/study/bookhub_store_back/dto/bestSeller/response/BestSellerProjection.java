package com.study.bookhub_store_back.dto.bestSeller.response;

import java.time.LocalDate;

public interface BestSellerProjection {
    String getIsbn();
    String getBookTitle();
    String getAuthor();
    String getPublisher();
    LocalDate getPublishedDate();
    Long getBookPrice();
    Long getDiscountRate();
    String getCoverImageUrl();
    String getDescription();
    String getCategoryName();
    Long getTotalSales();
}
