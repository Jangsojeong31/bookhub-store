package com.study.bookhub_store_back.repository;

import com.study.bookhub_store_back.entity.product.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, String> {
    @Query("""
    SELECT b FROM Book b
    WHERE
        b.bookStatus != com.study.bookhub_store_back.common.enums.BookStatus.HIDDEN AND (
            b.isbn = :keyword OR
            LOWER(b.bookTitle) LIKE LOWER(CONCAT('%', :keyword, '%')) OR
            LOWER(b.author) LIKE LOWER(CONCAT('%', :keyword, '%')) OR
            LOWER(b.publisher) LIKE LOWER(CONCAT('%', :keyword, '%'))
        )
""")
    List<Book> findAllByKeywordContaining(@Param("keyword") String keyword);

    List<Book> findTop5ByOrderByPublishedDateDesc();
}
