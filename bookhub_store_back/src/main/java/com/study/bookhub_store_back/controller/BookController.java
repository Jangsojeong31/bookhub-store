package com.study.bookhub_store_back.controller;

import com.study.bookhub_store_back.dto.ResponseDto;
import com.study.bookhub_store_back.dto.book.response.BookDetailResponseDto;
import com.study.bookhub_store_back.dto.book.response.BookSearchResponseDto;
import com.study.bookhub_store_back.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/customer")
@RequiredArgsConstructor
public class BookController {
    private final BookService bookService;

    // 도서 통합 검색
    @GetMapping("/books")
    public ResponseEntity<ResponseDto<List<BookSearchResponseDto>>> searchBook(
            @RequestParam String query
    ) {
        ResponseDto<List<BookSearchResponseDto>> response = bookService.searchBook(query);
        return ResponseEntity.ok(response);
    }

    // 도서 상세 정보
    @GetMapping("/books/{isbn}/details")
    public ResponseEntity<ResponseDto<BookDetailResponseDto>> getBookDetails(
            @PathVariable String isbn
    ) {
        ResponseDto<BookDetailResponseDto> response = bookService.getBookDetails(isbn);
        return ResponseEntity.ok(response);
    }
}
