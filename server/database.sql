CREATE DATABASE Todo ;
CREATE TABLE todos(
    todo_id SERIAL PRIMARY KEY ,
    description VARCHAR(300)
);