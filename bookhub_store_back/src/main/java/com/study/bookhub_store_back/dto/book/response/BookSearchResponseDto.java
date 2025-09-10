package com.study.bookhub_store_back.dto.book.response;

import com.study.bookhub_store_back.common.enums.CategoryType;
import com.study.bookhub_store_back.entity.product.Book;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class BookSearchResponseDto {
    private String isbn;
    private String title;
    private String coverUrl;
    private Long price;
    private Long discountPercent;
    private LocalDate publishedDate;

    private String authorName;
    private String publisherName;

    private String categoryName;
    private CategoryType categoryType;
    private String parentCategoryName;


    public static BookSearchResponseDto toResponseDto(Book book) {
        return BookSearchResponseDto.builder()
                .isbn(book.getIsbn())
                .title(book.getBookTitle())
                .coverUrl(book.getCoverImageUrl() == null ? null : book.getCoverImageUrl())
                .price(book.getBookPrice())
                .discountPercent(book.getDiscountRate() == null ? null : book.getDiscountRate())
                .publishedDate(book.getPublishedDate())
                .authorName(book.getAuthor())
                .publisherName(book.getPublisher())
                .categoryName(book.getCategoryId().getCategoryName())
                .categoryType(book.getCategoryId().getCategoryType())
                .parentCategoryName(book.getCategoryId().getParentCategoryId() == null
                        ? null : book.getCategoryId().getParentCategoryId().getCategoryName())
                .build();
    }

}
