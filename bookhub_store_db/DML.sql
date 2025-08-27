SELECT * FROM customers;
SELECT * FROM books;
SELECT * FROM book_categories;
SELECT * FROM authors;
SELECT * FROM publishers;
SELECT * FROM discount_policies;
SELECT * FROM upload_files;
SELECT * FROM carts;
SELECT * FROM cart_items;
SELECT * FROM orders;
SELECT * FROM order_details;
SELECT * FROM payments;
SELECT * FROM delivery_addresses;

SHOW VARIABLES LIKE 'character_set%';
SHOW VARIABLES LIKE 'collation%';
SHOW CREATE TABLE payments;
SELECT payment_method FROM payments;

UPDATE orders
SET delivery_address_id = NULL
WHERE order_id IN (4,5,6,7,8,9);





