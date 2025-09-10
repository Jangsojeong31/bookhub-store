package com.study.bookhub_store_back.service.serviceImpl;

import com.study.bookhub_store_back.dto.ResponseDto;
import com.study.bookhub_store_back.dto.book.response.BookDetailResponseDto;
import com.study.bookhub_store_back.dto.book.response.BookSearchResponseDto;
import com.study.bookhub_store_back.entity.product.Book;
import com.study.bookhub_store_back.repository.BookRepository;
import com.study.bookhub_store_back.service.BookService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {
    private final BookRepository bookRepository;

    // 통합 검색
    @Override
    public ResponseDto<List<BookSearchResponseDto>> searchBook(String keyword) {
        List<Book> books = bookRepository.findAllByKeywordContaining(keyword);

        List<BookSearchResponseDto> responseDtos = books.stream()
                .map(BookSearchResponseDto::toResponseDto)
                .collect(Collectors.toList());

        return ResponseDto.success("success", "success", responseDtos);
    }

    // 상세 정보
    @Override
    public ResponseDto<BookDetailResponseDto> getBookDetails(String isbn) {
        Book book = bookRepository.findById(isbn)
                .orElseThrow(() -> new EntityNotFoundException("Book not found: " + isbn));

        BookDetailResponseDto responseDto = BookDetailResponseDto.toResponseDto(book);

        return ResponseDto.success("success", "success", responseDto);
    }

}
