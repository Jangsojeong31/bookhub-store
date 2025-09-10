package com.study.bookhub_store_back.dto.book.response;

import com.study.bookhub_store_back.common.enums.CategoryType;
import com.study.bookhub_store_back.entity.product.Book;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@Getter
@AllArgsConstructor
@Builder
public class BookDetailResponseDto {
    private String isbn;
    private String title;
    private String coverUrl;
    private Long price;
    private Long discountPercent;
    private LocalDate publishedDate;
    private String description;

    private String authorName;
    private String publisherName;

    private String categoryName;
    private CategoryType categoryType;
    private String parentCategoryName;

    private String language;
    private Long pageCount;

    public static BookDetailResponseDto toResponseDto(Book book) {
        return BookDetailResponseDto.builder()
                .isbn(book.getIsbn())
                .title(book.getBookTitle())
                .coverUrl(book.getCoverImageUrl() == null ? null : book.getCoverImageUrl())
                .price(book.getBookPrice())
                .discountPercent(book.getDiscountRate() == null ? null : book.getDiscountRate())
                .publishedDate(book.getPublishedDate())
                .description(book.getDescription() == null ? null : book.getDescription())
                .authorName(book.getAuthor())
                .publisherName(book.getPublisher())
                .categoryName(book.getCategoryId().getCategoryName())
                .categoryType(book.getCategoryId().getCategoryType())
                .parentCategoryName(book.getCategoryId().getParentCategoryId() == null
                        ? null : book.getCategoryId().getParentCategoryId().getCategoryName())
                .language(book.getLanguage() == null ? null : book.getLanguage())
                .pageCount(book.getPageCount() == null ? null : book.getPageCount())
                .build();
    }
}
