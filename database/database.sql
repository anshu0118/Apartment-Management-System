CREATE DATABASE apartment_management;

USE apartment_management;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    role ENUM('admin', 'non-admin', 'broker') NOT NULL
);

CREATE TABLE apartments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    floorNumber INT NOT NULL,
    ownerName VARCHAR(100) NOT NULL,
    fund DECIMAL(10,2) NOT NULL
);

CREATE TABLE complaints (
    id INT AUTO_INCREMENT PRIMARY KEY,
    complaintText TEXT NOT NULL,
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id)
);
