CREATE DATABASE IF NOT EXISTS `bookhub_store_db`
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
USE `bookhub_store_db`;

-- 사용자 관련 테이블
CREATE TABLE IF NOT EXISTS `customers` (
	customer_id BIGINT AUTO_INCREMENT PRIMARY KEY,
	email VARCHAR(255) NULL UNIQUE,
    password VARCHAR(255) NULL, -- 일반 회원가입에서는 필수
    name VARCHAR(255) NULL,
    nickname VARCHAR(50) NULL,
    phone_number VARCHAR(20) NULL,
    profile_image_url VARCHAR(500) NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'USER',
    -- default_address_id BIGINT NULL, -- 기본 배송지
    
    social_provider VARCHAR(50) NULL,
    social_id VARCHAR(100) NULL,
    
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    
	-- CONSTRAINT fk_default_address FOREIGN KEY (default_address_id)
	-- REFERENCES delivery_addresses(delivery_address_id) ON DELETE SET NULL
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 소셜 계정 연동
-- CREATE TABLE IF NOT EXISTS `customer_socials` (

-- )
-- CREATE UNIQUE INDEX idx_social ON customers(social_provider, social_id);

-- 장바구니 관련 테이블
CREATE TABLE IF NOT EXISTS `carts` (
	cart_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    customer_id BIGINT NOT NULL,
    
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_customer_id FOREIGN KEY (customer_id)
    REFERENCES customers(customer_id) ON DELETE CASCADE
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `cart_items` (
	cart_item_id BIGINT AUTO_INCREMENT PRIMARY KEY,
	cart_id BIGINT NOT NULL,
    isbn VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_cart_id FOREIGN KEY (cart_id)
    REFERENCES carts(cart_id) ON DELETE CASCADE,
    CONSTRAINT fk_isbn FOREIGN KEY (isbn)
    REFERENCES books(isbn)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 주문 관련 테이블
CREATE TABLE IF NOT EXISTS `orders` (
	order_id BIGINT PRIMARY KEY AUTO_INCREMENT,
	order_number VARCHAR(50) NOT NULL UNIQUE, -- 주문 번호
    order_name VARCHAR(255) NOT NULL, 
    customer_id BIGINT NOT NULL,
    
    delivery_address_id BIGINT NULL,
    recipient_name VARCHAR(50) NOT NULL,
	phone_number VARCHAR(50) NOT NULL,
    postal_code VARCHAR(50) NOT NULL, -- 우편 주소
    full_address VARCHAR(255) NOT NULL, -- 도로명 주소 | 지번 주소
    address_detail VARCHAR(255), -- 상세 주소
    
    total_amount BIGINT NOT NULL, -- 총 금액
    order_date DATETIME NOT NULL,
    status VARCHAR(255) NOT NULL, -- 결제 상태
    
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_orders_customers FOREIGN KEY (customer_id)
    REFERENCES customers(customer_id),
    CONSTRAINT fk_orders_delivery_addresses FOREIGN KEY (delivery_address_id)
	REFERENCES delivery_addresses(delivery_address_id),
	CONSTRAINT chk_order_status CHECK (status IN ('PENDING', 'PAID', 'FAILED'))
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `order_details` (
	order_detail_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    order_id BIGINT NOT NULL,
    isbn VARCHAR(255) NOT NULL,
    book_price BIGINT NOT NULL,
    quantity INT NOT NULL,
    total_price BIGINT NOT NULL, -- book_price * quantity
    
    CONSTRAINT fk_order_details_orders FOREIGN KEY (order_id)
    REFERENCES orders(order_id),
    CONSTRAINT fk_order_details_books FOREIGN KEY (isbn)
    REFERENCES books(isbn)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 결제 테이블
CREATE TABLE IF NOT EXISTS `payments` (
	payment_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    payment_key VARCHAR(255) NOT NULL,
    order_id BIGINT NOT NULL,
    order_number VARCHAR(50) NOT NULL,
    payment_method VARCHAR(255),
    amount BIGINT NOT NULL,
    status VARCHAR(255) NOT NULL, -- 결제 승인 상태
    requested_at DATETIME NOT NULL,
    approved_at DATETIME,
    
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_payments_orders FOREIGN KEY (order_id)
    REFERENCES orders(order_id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 배송지 테이블
CREATE TABLE IF NOT EXISTS `delivery_addresses` (
	delivery_address_id BIGINT PRIMARY KEY AUTO_INCREMENT,
	customer_id BIGINT NOT NULL,
    recipient_name VARCHAR(50) NOT NULL,
    phone_number VARCHAR(50) NOT NULL,
    postal_code VARCHAR(50) NOT NULL, -- 우편 주소
    full_address VARCHAR(255) NOT NULL, -- 도로명 주소 | 지번 주소
    address_detail VARCHAR(255), -- 상세 주소
    is_default BOOLEAN NOT NULL DEFAULT FALSE, -- 기본 배송지
    
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_addresses_customers FOREIGN KEY (customer_id)
    REFERENCES customers(customer_id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 도서 관련 테이블
CREATE TABLE IF NOT EXISTS `books` (
	isbn VARCHAR(50) PRIMARY KEY,
    book_title VARCHAR(255) NOT NULL,
	author VARCHAR(255) NOT NULL,
    publisher VARCHAR(255) NOT NULL,
    book_price BIGINT NOT NULL,
    discount_rate BIGINT,
    published_date DATE NOT NULL,
    book_status VARCHAR(50) NOT NULL,
    page_count BIGINT,
    language VARCHAR(255),
    description TEXT,
    cover_image_url VARCHAR(255),

    category_id BIGINT NOT NULL,
    
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_books_categories FOREIGN KEY (category_id)
    REFERENCES categories(category_id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `categories` (
	category_id BIGINT PRIMARY KEY AUTO_INCREMENT,
	category_type VARCHAR(255) NOT NULL,
    parent_category_id BIGINT NULL,
    category_name VARCHAR(255) NOT NULL,
    
    CONSTRAINT fk_categories_self FOREIGN KEY (parent_category_id)
    REFERENCES categories(category_id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
