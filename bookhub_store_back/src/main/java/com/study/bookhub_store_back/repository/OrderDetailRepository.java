package com.study.bookhub_store_back.repository;

import com.study.bookhub_store_back.dto.bestSeller.response.BestSellerDto;
import com.study.bookhub_store_back.dto.bestSeller.response.BestSellerProjection;
import com.study.bookhub_store_back.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {
    List<OrderDetail> findAllByOrder_OrderId(Long orderOrderId);

    @Query(
            value = """
        SELECT 
            b.isbn AS isbn,
            b.book_title AS bookTitle,
            b.author AS author,
            b.publisher AS publisher,
            b.published_date AS publishedDate,
            b.book_price AS bookPrice,
            b.discount_rate AS discountRate,
            b.cover_image_url AS coverImageUrl,
            b.description AS description,
            bc.category_name AS categoryName,
            SUM(od.quantity) AS totalSales
        FROM order_details od
                 JOIN orders o ON od.order_id = o.order_id
                 JOIN books b ON od.isbn = b.isbn
                 JOIN categories bc ON b.category_id = bc.category_id
        WHERE o.order_date >= DATE_SUB(NOW(), INTERVAL 30 DAY)
          AND bc.category_type = :categoryType
        GROUP BY b.isbn, b.book_title, b.author, b.publisher, b.published_date, b.book_price,
                 b.discount_rate, b.cover_image_url, b.description, bc.category_name
        ORDER BY totalSales DESC
        LIMIT 10;

""",
            nativeQuery = true)
    List<BestSellerProjection> findBestSellersByCategory(@Param("categoryType") String categoryType);
}
