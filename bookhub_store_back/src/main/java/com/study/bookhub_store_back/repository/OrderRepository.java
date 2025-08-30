package com.study.bookhub_store_back.repository;

import com.study.bookhub_store_back.dto.bestSeller.response.BestSellerDto;
import com.study.bookhub_store_back.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Optional<Order> findByOrderNumber(String orderNumber);

    List<Order> findByCustomer_CustomerIdOrderByOrderDateDesc(Long customerCustomerId);

    @Query (
            value = """
        SELECT 
            b.book_isbn,
            b.book_title,
            a.author_name,
            p.publisher_name,
            bc.category_name,
            CONCAT('/files/', up.file_name) AS coverUrl,
            SUM(od.quantity) AS totalSales
        FROM order_details od
                 JOIN orders o ON od.order_id = o.order_id
                 JOIN books b ON od.isbn = b.book_isbn
                 JOIN authors a ON b.author_id = a.author_id
                 JOIN publishers p ON b.publisher_id = p.publisher_id
                 JOIN book_categories bc ON b.category_id = bc.category_id
                 LEFT JOIN upload_files up ON b.cover_image_id = up.upload_file_id
        WHERE o.order_date >= DATE_SUB(NOW(), INTERVAL 30 DAY)
          AND bc.category_type = :categoryType
        GROUP BY b.book_isbn, b.book_title, a.author_name,
                 p.publisher_name, bc.category_name, up.file_name
         ORDER BY totalSales DESC
                    LIMIT 20;

""",
nativeQuery = true)
    List<BestSellerDto> findBestSellersByCategory(@Param("categoryType") String catType);
}
