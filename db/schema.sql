DROP DATABASE IF EXISTS employeetracker_db;
CREATE DATABASE employeetracker_db;

USE employeetracker_db;

CREATE TABLE department (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE role (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(60) UNIQUE NOT NULL,
  salary DECIMAL(10, 2) UNSIGNED NOT NULL,
  department_id INT UNSIGNED NOT NULL,
);

CREATE TABLE employee (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT(6) UNSIGNED NOT NULL,
  INDEX role_ind (role_id),
  manager_id INT(5) UNSIGNED,
  INDEX man_ind (manager_id),
);
