ALTER TABLE cart_items
MODIFY COLUMN quantity INT NOT NULL;

ALTER TABLE orders MODIFY COLUMN order_number VARCHAR(50) NOT NULL UNIQUE;
ALTER TABLE payments MODIFY COLUMN order_number VARCHAR(50) NOT NULL UNIQUE;
ALTER TABLE payments MODIFY COLUMN payment_method VARCHAR(255);
ALTER TABLE payments MODIFY COLUMN approved_at DATETIME;

ALTER TABLE payments DROP CHECK chk_payment_status;

ALTER TABLE customers
ADD CONSTRAINT fk_default_address FOREIGN KEY (default_address_id)
REFERENCES delivery_addresses(delivery_address_id)
ON DELETE SET NULL;

ALTER TABLE orders
MODIFY delivery_address_id BIGINT NULL;

ALTER TABLE orders
ADD CONSTRAINT fk_orders_delivery_addresses FOREIGN KEY (delivery_address_id)
REFERENCES delivery_addresses(delivery_address_id)
ON DELETE SET NULL;

ALTER TABLE orders
ADD COLUMN recipient_name VARCHAR(50) NOT NULL,
ADD COLUMN	phone_number VARCHAR(50) NOT NULL,
ADD COLUMN    postal_code VARCHAR(50) NOT NULL, -- 우편 주소
 ADD COLUMN   full_address VARCHAR(255) NOT NULL, -- 도로명 주소 | 지번 주소
 ADD COLUMN   address_detail VARCHAR(255); -- 상세 주소
 
ALTER TABLE books
DROP FOREIGN KEY fk_books_upload_file,
DROP COLUMN cover_image_id;

ALTER TABLE books
ADD COLUMN cover_image_url VARCHAR(255) NULL;

DROP TABLE IF EXISTS upload_files;

ALTER TABLE books
DROP FOREIGN KEY books_ibfk_4,
DROP COLUMN discount_policy_id;

ALTER TABLE books
ADD COLUMN discount_rate BIGINT NULL;

SHOW INDEX FROM customers;


