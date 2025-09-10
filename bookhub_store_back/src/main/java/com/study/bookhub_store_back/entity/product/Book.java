package com.study.bookhub_store_back.entity.product;

import com.study.bookhub_store_back.common.BaseTimeEntity;
import com.study.bookhub_store_back.common.enums.BookStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "books")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Book extends BaseTimeEntity {

    @Id
    @Column(name = "isbn")
    private String isbn;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private BookCategory categoryId;

    @Column(name = "book_title", nullable = false)
    private String bookTitle;

    @Column(nullable=false)
    private String author;

    @Column(nullable = false)
    private String publisher;

    @Column(name = "book_price", nullable = false)
    private Long bookPrice;

    private Long discountRate;

    @Column(name = "published_date", nullable = false)
    private LocalDate publishedDate;

    @Column(name = "page_count")
    private Long pageCount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BookStatus bookStatus;

    private String language;

    @Lob
    @Column
    private String description;

    private String coverImageUrl;
}