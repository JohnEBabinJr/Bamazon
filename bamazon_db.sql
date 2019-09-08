DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products
(
    id INT (10) AUTO_INCREMENT NOT NULL,
    catergory_name VARCHAR(100),
    product_name VARCHAR(100),
    price DECIMAL(10,2),
    stock_quantity INT,
    PRIMARY KEY(id)
);



INSERT INTO products (id, catergory_name, product_name, price, stock_quantity) values (1, 'food', "milk",4.99, 40);
INSERT INTO products (id, catergory_name, product_name, price, stock_quantity) values (2, 'food', "eggs",2.99, 40);
INSERT INTO products (id, catergory_name, product_name, price, stock_quantity) values (3, 'funiture', "couch",149.99, 5);
INSERT INTO products (id, catergory_name, product_name, price, stock_quantity) values (4, 'funiture', "desk",99.99, 10);
INSERT INTO products (id, catergory_name, product_name, price, stock_quantity) values (5, 'office', "paper",19.99, 35);
INSERT INTO products (id, catergory_name, product_name, price, stock_quantity) values (6, 'recreational', "bike",59.99, 12);
INSERT INTO products (id, catergory_name, product_name, price, stock_quantity) values (7, 'electronics', "computer",899.99, 6);
INSERT INTO products (id, catergory_name, product_name, price, stock_quantity) values (8, 'electronics', "xbox",349.99, 25);
INSERT INTO products (id, catergory_name, product_name, price, stock_quantity) values (9, 'pet', "chew-toys" , 7.99, 30);


SELECT * FROM products;