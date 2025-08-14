package com.study.bookhub_store_back.service;

import com.study.bookhub_store_back.dto.ResponseDto;
import com.study.bookhub_store_back.dto.book.response.BookDetailResponseDto;
import com.study.bookhub_store_back.dto.book.response.BookSearchResponseDto;

import java.util.List;

public interface BookService {
    ResponseDto<List<BookSearchResponseDto>> searchBook(String keyword);

    ResponseDto<BookDetailResponseDto> getBookDetails(String isbn);
}
