package com.study.bookhub_store_back.dto.book.response;

import com.study.bookhub_store_back.common.enums.CategoryType;
import com.study.bookhub_store_back.entity.product.Book;
import com.study.bookhub_store_back.entity.product.BookCategory;
import com.study.bookhub_store_back.entity.product.DiscountPolicy;
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
    private String bookCoverUrl;
    private Long price;
    private LocalDate publishedDate;

    private String authorName;

    private String publisherName;

    private String categoryName;
    private CategoryType categoryType;
    private String parentCategoryName;

    private List<BookEventDto> events;

    public static BookSearchResponseDto toResponseDto(Book book, List<BookEventDto> events) {
        return BookSearchResponseDto.builder()
                .isbn(book.getBookIsbn())
                .title(book.getBookTitle())
                .bookCoverUrl(book.getCoverImage() != null ? "/files/" + book.getCoverImage().getFileName() : null)
                .price(book.getBookPrice())
                .publishedDate(book.getPublishedDate())
                .authorName(book.getAuthorId().getAuthorName())
                .publisherName(book.getPublisherId().getPublisherName())
                .categoryName(book.getCategoryId().getCategoryName())
                .categoryType(book.getCategoryId().getCategoryType())
                .parentCategoryName(book.getCategoryId().getParentCategoryId() == null
                        ? null : book.getCategoryId().getParentCategoryId().getCategoryName())
                .events(events)
                .build();
    }

}
