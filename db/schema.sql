DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;

USE employees;

CREATE TABLE department (
 id int auto_increment primary key
,name varchar(30)
);

CREATE TABLE role (
 id int auto_increment primary key
,title varchar(30)
,salary DECIMAL
,department_id int
 references department(id)
 on delete CASCADE
);

  -- CREATE id AS INTERGER, title AS VARCHAR, salary AS DECIMAL, deplartment_id AS INTEGER
  -- MAKE id As PRIMARY KEY
  -- MAKE department_id AS FOREIGN KEY REFERENCING department TABLE AND
  -- MAKE CONSTRAINT 'ON DELETE CASCADE' (WITHOUT QUOTES) ON THIS FOREIGN KEY
  -- TODO: YOUR CODE HERE

);

CREATE TABLE employee (
  -- CREATE COLUMNS: id AS INT, first_name AS VARCHAR, last_name AS VARCHAR, role_id AS INTEGER, AND manager_id AS INT.
  -- MAKE id As PRIMARY KEY
  -- MAKE role_id AS FOREIGN KEY REFERENCING role TABLE AND MAKE CONSTRAINT ON DELETE CASCADE ON THIS FOREIGN KEY
  -- MAKE manager_id AS FOREIGN KEY REFERENCING employee TABLE ITSELF AND MAKE CONSTRAINT 'ON DELETE SET NULL' ON THIS FOREIGN KEY
  -- TODO: YOUR CODE HERE
 id int primary key auto_increment
,first_name varchar(30)
,last_name varchar(30)
,role_id int
 references role(id)
 on delete CASCADE
,manager_id int 
 references employee(id)
 on delete set null
);
