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






