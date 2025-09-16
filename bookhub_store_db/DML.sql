USE `bookhub_store_db`;
SELECT * FROM customers;
SELECT * FROM books;
SELECT * FROM categories;
SELECT * FROM authors;
SELECT * FROM publishers;
SELECT * FROM discount_policies;

SELECT * FROM carts;
SELECT * FROM cart_items;

SELECT * FROM orders;
SELECT * FROM order_details;

SELECT * FROM payments;
SELECT * FROM delivery_addresses;

SELECT * FROM example;


UPDATE orders
SET delivery_address_id = NULL
WHERE order_id IN (4,5,6,7,8,9);

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
          AND bc.category_type = "DOMESTIC"
        GROUP BY b.isbn, b.book_title, b.author, b.publisher, b.published_date, b.book_price, b.discount_rate, b.cover_image_url, b.description, bc.category_name
        ORDER BY totalSales DESC
        LIMIT 10;




