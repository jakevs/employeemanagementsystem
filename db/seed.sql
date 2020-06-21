USE employees;

  
INSERT INTO department (department_name)
VALUES 
("My House"),
("Office Heads");


INSERT INTO role (title, salary, department_id)
VALUES 
("Deputy Director", 71000.00, 1),
("Director", 90000.00, 2),
("Singer", 35000.00, 1),
("Trouble Maker", 40000.00, 2);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('James', 'Van Slyke', 1, NULL),
    ('Molly', 'Van Slyke', 2, 1),
    ('Madeline', 'Van Slyke', 3, NULL),
    ('Grayson', 'Van Slyke', 4, 3),
    ('Jim', 'Van Slyke', 5, NULL),
    ('Patti', 'Van Slyke', 6, 5),
    ('Scott', 'Shreders', 7, NULL),
    ('Matt', 'Geier', 8, 7);