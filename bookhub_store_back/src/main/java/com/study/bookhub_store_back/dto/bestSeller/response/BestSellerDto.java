package com.study.bookhub_store_back.dto.bestSeller.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class BestSellerDto {
    private String isbn;
    private String bookTitle;
    private String authorName;
    private String categoryName;
    private String publisherName;
    private LocalDate publishedDate;
    private Long bookPrice;
    private Long discountRate;
    private String coverUrl;
    private String description;
    private Long totalSales;

    public BestSellerDto(String bookIsbn, String bookTitle, String authorName,
                         String categoryName, String publisherName, LocalDate publishedDate,
                         Long price, Long discountRate,
                         String coverUrl, String description,
                         Number totalSales) {
        this.isbn = bookIsbn;
        this.bookTitle = bookTitle;
        this.authorName = authorName;
        this.categoryName = categoryName;
        this.publisherName = publisherName;
        this.publishedDate = publishedDate;
        this.bookPrice = price;
        this.discountRate = discountRate;
        this.coverUrl = coverUrl;
        this.description = description;
        this.totalSales = totalSales != null ? totalSales.longValue() : 0;
    }
}

