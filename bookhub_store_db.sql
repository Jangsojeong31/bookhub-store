CREATE DATABASE IF NOT EXISTS `bookhub_store_db`
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
USE `bookhub_store_db`;

CREATE TABLE IF NOT EXISTS `customers` (
	customer_id BIGINT AUTO_INCREMENT PRIMARY KEY,
	email VARCHAR(255) NULL UNIQUE, -- 일반 회원가입에서는 필수
    password VARCHAR(255) NULL, -- 일반 회원가입에서는 필수
    nickname VARCHAR(50) NOT NULL,
    phone_number VARCHAR(20) NULL,
    profile_image_url VARCHAR(500) NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'USER',
    default_address_id BIGINT NULL, -- 기본 배송지
    
    social_provider VARCHAR(50) NULL,
    social_id VARCHAR(100) NULL,
    
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_default_address FOREIGN KEY (default_address_id)
    REFERENCES delivery_addresses(delivery_address_id) ON DELETE SET NULL
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CREATE UNIQUE INDEX idx_social ON customers(social_provider, social_id);