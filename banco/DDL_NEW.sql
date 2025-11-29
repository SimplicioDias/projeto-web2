CREATE SCHEMA IF NOT EXISTS inventory_control;
drop schema inventory_control;
use inventory_control;

CREATE TABLE IF NOT EXISTS users (
id INT AUTO_INCREMENT,
name VARCHAR(100) NOT NULL,
email VARCHAR(100) UNIQUE NOT NULL,
password_hash VARCHAR (255) NOT NULL,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP(),

PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS categories (
id INT AUTO_INCREMENT,
name VARCHAR(100) NOT NULL,
description TEXT,

PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS suppliers (
id INT AUTO_INCREMENT,
name VARCHAR(100),
cnpj_cpf VARCHAR(20),
contact VARCHAR(30),

PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS warehouses (
id INT AUTO_INCREMENT,
name VARCHAR(100) NOT NULL,
address_reference VARCHAR(50),

PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS products (
id INT AUTO_INCREMENT,
sku VARCHAR(50),
name VARCHAR(100) NOT NULL,
description TEXT,
category_id INT,
supplier_id INT,
markup DECIMAL(5,2) NOT NULL DEFAULT 1.50,
cost_price DECIMAL(10,2) NOT NULL,
selling_price DECIMAL (10,2) AS (cost_price * markup)  STORED,

PRIMARY KEY (id),
FOREIGN KEY (category_id) REFERENCES categories(id),
FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
);


CREATE TABLE IF NOT EXISTS price_adjustments (
id INT AUTO_INCREMENT,
product_id INT,
old_price DECIMAL (10,2),
new_price DECIMAL (10,2),
user_id INT,
date_adjustments DATETIME DEFAULT CURRENT_TIMESTAMP(),

PRIMARY KEY (id),
FOREIGN KEY (product_id) REFERENCES products(id),
FOREIGN KEY (user_id) REFERENCES users (id)
);


CREATE TABLE IF NOT EXISTS stocks (
id INT AUTO_INCREMENT,
product_id INT NOT NULL,
warehouse_id INT NOT NULL,
quantity INT NOT NULL DEFAULT 0,
last_update DATETIME DEFAULT CURRENT_TIMESTAMP(),

PRIMARY KEY (id),
FOREIGN KEY (product_id) REFERENCES products(id),
FOREIGN KEY (warehouse_id) REFERENCES warehouses(id),

UNIQUE (product_id, warehouse_id)
);

CREATE TABLE IF NOT EXISTS stock_movements (
id INT AUTO_INCREMENT,
movement_type ENUM ('ENTRADA', 'SAIDA', 'TRANSFERENCIA') NOT NULL,
-- quantity INT NOT NULL CHECK (quantity > 0),
-- unit_cost DECIMAL(10,2) NOT NULL,
-- total_value DECIMAL(10,2) AS (unit_cost * quantity) STORED,
movement_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
description TEXT NULL,

PRIMARY KEY (id)
-- FOREIGN KEY (stock_id) REFERENCES stocks(id)
);

CREATE TABLE IF NOT EXISTS movement_items (
    id INT AUTO_INCREMENT,
    movement_id INT NOT NULL,
    stock_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_cost DECIMAL(10,2) NULL,
    total_value DECIMAL(10,2) AS (unit_cost * quantity) STORED,

    PRIMARY KEY (id),
    FOREIGN KEY (movement_id) REFERENCES stock_movements(id) ON DELETE CASCADE,
    FOREIGN KEY (stock_id) REFERENCES stocks(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- INDEXES utils
CREATE INDEX idx_product_sku ON products(sku);

-- CREATE TRIGGERS

--  DROP TRIGGER IF EXISTS trg_prevent_negative_movement_item;

CREATE TRIGGER IF NOT EXISTS trg_prevent_negative_movement_item
BEFORE INSERT ON movement_items
FOR EACH ROW
BEGIN
  DECLARE currQty INT;
  DECLARE movType VARCHAR(20);

  SELECT movement_type INTO movType
  FROM stock_movements
  WHERE id = NEW.movement_id;

  SELECT quantity INTO currQty
  FROM stocks
  WHERE id = NEW.stock_id
  FOR UPDATE;

  IF movType = 'SAIDA' AND currQty < NEW.quantity THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'Estoque insuficiente para SAIDA.';
  END IF;

END;

-- DROP TRIGGER IF EXISTS trg_update_stock_after_movement_item;

CREATE TRIGGER IF NOT EXISTS trg_update_stock_after_movement_item
AFTER INSERT ON movement_items
FOR EACH ROW
BEGIN
  DECLARE movType VARCHAR(20);

  SELECT movement_type INTO movType
  FROM stock_movements
  WHERE id = NEW.movement_id;

  IF movType = 'ENTRADA' THEN
    UPDATE stocks
      SET quantity = quantity + NEW.quantity,
          last_update = CURRENT_TIMESTAMP()
      WHERE id = NEW.stock_id;
    
  ELSEIF movType = 'SAIDA' THEN
    UPDATE stocks
      SET quantity = quantity - NEW.quantity,
          last_update = CURRENT_TIMESTAMP()
      WHERE id = NEW.stock_id;
  END IF;

END;


CREATE TRIGGER IF NOT EXISTS trg_log_price_change
AFTER UPDATE ON products
FOR EACH ROW
BEGIN
    IF OLD.cost_price <> NEW.cost_price THEN
        INSERT INTO price_adjustments (product_id, old_price, new_price, user_id)
        VALUES (NEW.id, OLD.cost_price, NEW.cost_price, 1);
    END IF;
END;


CREATE TRIGGER trg_set_unit_cost
BEFORE INSERT ON movement_items
FOR EACH ROW
BEGIN
    DECLARE v_cost DECIMAL(10,2);

    IF NEW.unit_cost IS NULL THEN
        SELECT cost_price INTO v_cost
        FROM products
        WHERE id = NEW.product_id;

        SET NEW.unit_cost = v_cost;
    END IF;

END;





-- ---------------------------------------------
SHOW TRIGGERS;




-- CREATE PROCEDURES
CREATE PROCEDURE IF NOT EXISTS sp_adjust_price(
    IN p_product_id INT,
    IN p_new_cost DECIMAL(10,2),
    IN p_user_id INT
)
BEGIN
    DECLARE old_cost DECIMAL(10,2);

    SELECT cost_price INTO old_cost FROM products WHERE id = p_product_id;

    UPDATE products SET cost_price = p_new_cost WHERE id = p_product_id;

    INSERT INTO price_adjustments (product_id, old_price, new_price, user_id)
    VALUES (p_product_id, old_cost, p_new_cost, p_user_id);
END;





