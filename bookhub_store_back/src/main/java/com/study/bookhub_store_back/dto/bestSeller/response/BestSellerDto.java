package com.study.bookhub_store_back.dto.bestSeller.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class BestSellerDto {
    private String bookIsbn;
    private String bookTitle;
    private String authorName;
    private String categoryName;
    private String publisherName;
    private String coverUrl;
    private Long totalSales;

    public BestSellerDto(String bookIsbn, String bookTitle, String authorName,
                         String categoryName, String publisherName, String coverUrl,
                         Number totalSales) {
        this.bookIsbn = bookIsbn;
        this.bookTitle = bookTitle;
        this.authorName = authorName;
        this.categoryName = categoryName;
        this.publisherName = publisherName;
        this.coverUrl = coverUrl;
        this.totalSales = totalSales != null ? totalSales.longValue() : 0;
    }
}

