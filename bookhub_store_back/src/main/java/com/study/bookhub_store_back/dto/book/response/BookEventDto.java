//package com.study.bookhub_store_back.dto.book.response;
//
//import com.study.bookhub_store_back.entity.product.Book;
//import com.study.bookhub_store_back.entity.product.BookCategory;
//import com.study.bookhub_store_back.entity.product.DiscountPolicy;
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.Getter;
//
//import java.time.LocalDate;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Optional;
//
//@Getter
//@AllArgsConstructor
//@Builder
//public class BookEventDto {
//    private String eventName;
//    private String eventType;
//    private String eventDescription;
//    private int discountPercent;
//    private LocalDate startDate;
//    private LocalDate endDate;
//
//    public static List<BookEventDto> findEvents(Book book) {
//        List<BookEventDto> events = new ArrayList<>();
//
//        Optional.ofNullable(book.getDiscountPolicyId())
//                .map(BookEventDto::toEventDto)
//                .ifPresent(events::add);
//
//        Optional.ofNullable(book.getCategoryId())
//                .map(BookCategory::getDiscountPolicyId)
//                .map(BookEventDto::toEventDto)
//                .ifPresent(events::add);
//
//        return events;
//    }
//
//    private static BookEventDto toEventDto(DiscountPolicy policy) {
//        return BookEventDto.builder()
//                .eventName(policy.getPolicyTitle())
//                .eventType(policy.getPolicyType().toString())
//                .eventDescription(policy.getPolicyDescription())
//                .discountPercent(policy.getDiscountPercent())
//                .startDate(policy.getStartDate())
//                .endDate(policy.getEndDate())
//                .build();
//    }
//
//}
