use inventory_control;


INSERT INTO users (name, email, password_hash)
VALUES
('admin', 'admin@admin.com', 'hash123'),
('João Silva', 'joao@teste.com', 'hash234'),
('Maria Oliveira', 'maria@teste.com', 'hash345');

INSERT INTO categories (name, description)
VALUES
('Cervejas', 'Cervejas em geral'),
('Destilados', 'Destilados em geral'),
('Refrigerantes', 'Refrigerantes em geral');

INSERT INTO suppliers (name, cnpj_cpf, contact)
VALUES
('AMBEV', '12.345.678/0001-99', '1199999-8888'),
('COCA-COLA', '98.765.432/0001-11', '1191234-5678');

INSERT INTO warehouses (name, address_reference)
VALUES
('bar', 'Crato');


INSERT INTO products (name, category_id, supplier_id, markup, cost_price)
VALUES
('Skol 600ml', 1, 1, 1.80, 6.00),
('Skol 300ml', 1, 1, 1.70, 2.20),
('Coca-Cola C/ Açucar 2L', 3, 2, 1.60, 9.00);


-- TALVEZ A PRIMEIRA INSERçÂO MAS ISSO NÃO PODERA ACONTECER
-- SERA ATUALIZADO AUTOMATICO COM TRIGGERS
INSERT INTO stocks (product_id, warehouse_id, quantity)
VALUES
(1, 1, 0),
(2, 1, 0),
(3, 1, 0);

-- PRIMEIRO PASSO PARA INSERIR CORRETAMNTE NO ESTOQUER:
-- INSERIR AQUI EM stock_movements CABEÇALHO

INSERT INTO stock_movements (movement_type, description)
VALUES ('ENTRADA', 'Compra inicial');


-- SEGUNDO PASSO PARA INSERIR CORRETAMENTE NO ESTOQUER:
-- Pegue o ID do movimento recém-criado:
SELECT * FROM stock_movements ORDER BY id DESC LIMIT 1;
-- INSERIR AQUI EM stock_movements INTENS EM MOVIMENTO
-- TRIGGER É DISPARADA AQUI!
INSERT INTO movement_items 
(movement_id, stock_id, product_id, quantity)
VALUES
(1, 1, 1, 24), 
(1, 2, 2, 23), 
(1, 3, 3, 12);

SELECT * FROM movement_items;

INSERT INTO stock_movements (movement_type, description)
VALUES ('SAIDA', 'Venda de produtos');

INSERT INTO movement_items (movement_id, stock_id, product_id, quantity)
VALUES
(2, 1, 3, 54);  

INSERT INTO movement_items (movement_id, stock_id, product_id, quantity)
VALUES
(2, 1, 1, 99);


INSERT INTO audit_log
(table_name, record_id, field_name, old_value, new_value, changed_by)
VALUES
('products', 1, 'cost_price', '6.00', '5.50', 1),
('products', 2, 'name', 'Skol 300ml', 'Skol 1L', 1),
('warehouses', 1, 'name', 'bar', 'barzinho', 1),
('suppliers', 2, 'contact', '212223-5566', '2198888-7777', 1);


UPDATE products SET cost_price = 5.5
WHERE id = 1;

