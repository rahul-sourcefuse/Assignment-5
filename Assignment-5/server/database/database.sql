CREATE DATABASE userdatabase;

CREATE TYPE roleType AS ENUM('SuperAdmin','Admin','Subscriber');

CREATE TABLE userstable(
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(150) NOT NULL, 
    middleName VARCHAR(150),
    lastName VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phoneNumber  VARCHAR(20) NOT NULL,
    Role roleType NOT NULL,
    Address  VARCHAR(200) NOT NULL,
    Doj VARCHAR(250)
);


INSERT INTO userstable(firstName,middleName,lastName,email,phoneNumber,Role,Address,Doj) VALUES ('A','B','C','a@gmail',1234567890,'Admin','123 abc nagar xyz city', '12 jan 2022 14 hour 56min');

