-- =============================
-- DATABASE CONFIG
-- =============================
CREATE DATABASE IF NOT EXISTS pharmacy_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE pharmacy_db;

-- =============================
-- USERS
-- =============================
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    -- has_logged_in BOOLEAN NOT NULL DEFAULT FALSE,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(100) NOT NULL UNIQUE,
    role ENUM('REQUESTER', 'STOREKEEPER', 'MANAGER') NOT NULL,
    address VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =============================
-- DRUGS (THUỐC)
-- =============================
CREATE TABLE drugs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =============================
-- WAREHOUSES (KHO)
-- =============================
CREATE TABLE warehouses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    floor INT,
    temperature FLOAT,
    type ENUM('NORMAL', 'COOL', 'COLD', 'SPECIAL') DEFAULT 'NORMAL'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =============================
-- BATCHES (LÔ THUỐC)
-- =============================
CREATE TABLE batches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    drug_id INT NOT NULL,
    batch_code VARCHAR(100) NOT NULL,
    quantity INT NOT NULL,
    import_date DATE,
    expiry_date DATE,
    warehouse_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (drug_id) REFERENCES drugs(id),
    FOREIGN KEY (warehouse_id) REFERENCES warehouses(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =============================
-- IMPORT REQUEST (YÊU CẦU NHẬP)
-- =============================
CREATE TABLE import_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    drug_id INT NOT NULL,
    batch_code VARCHAR(100),
    quantity INT NOT NULL,
    status ENUM('PENDING', 'RECEIVED') DEFAULT 'PENDING',
    received_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (drug_id) REFERENCES drugs(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =============================
-- EXPORT REQUEST (YÊU CẦU XUẤT)
-- =============================
CREATE TABLE export_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    requester_id INT NOT NULL,

    -- trạng thái tổng
    status ENUM('PENDING', 'APPROVED', 'REJECTED', 'COMPLETED', 'FAILED') DEFAULT 'PENDING',

    -- xác nhận 2 bên
    storekeeper_confirm BOOLEAN DEFAULT NULL,
    requester_confirm BOOLEAN DEFAULT NULL,

    -- kết quả xử lý
    handle_result ENUM('SENT', 'OUT_OF_STOCK'),
    feedback_note TEXT,

    processed_date TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (requester_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =============================
-- EXPORT REQUEST ITEMS
-- =============================
CREATE TABLE export_request_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    export_request_id INT NOT NULL,
    drug_id INT NOT NULL,
    quantity INT NOT NULL,

    FOREIGN KEY (export_request_id) REFERENCES export_requests(id),
    FOREIGN KEY (drug_id) REFERENCES drugs(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =============================
-- INVENTORY LOG
-- =============================
CREATE TABLE inventory_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    drug_id INT,
    batch_id INT,

    change_amount INT NOT NULL, -- + / -
    type ENUM('IMPORT', 'EXPORT', 'ADJUST') NOT NULL,

    ref_id INT,
    ref_type ENUM('IMPORT_REQUEST', 'EXPORT_REQUEST'),

    note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (drug_id) REFERENCES drugs(id),
    FOREIGN KEY (batch_id) REFERENCES batches(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO users (username, password, name, email, role)
VALUES
(
  'manager',
  '$2b$10$2Bj.HDGwWK7hxmXs1iSZke9sEdLH5Sn7d.bqc4EWVIhGi3mxbJkFW',
  'Manager One',
  'manager@gmail.com',
  'MANAGER'
),
(
  'store',
  '$2b$10$2Bj.HDGwWK7hxmXs1iSZke9sEdLH5Sn7d.bqc4EWVIhGi3mxbJkFW',
  'Store Keeper One',
  'store@gmail.com',
  'STOREKEEPER'
);