INSERT INTO departments 
    (department_name)
    VAlUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');


INSERT INTO roles
    (title, department_id, salary)
    VALUES
    ('Salesmen', '1', '60000'),
    ('Director', '1', '160000'),
    ('Manager', '2', '90000'),
    ('Analyst', '2', '50000'),
    ('CTO', '3', '190000'),
    ('Developer', '3', '100000'),
    ('Database Analyst', '3', '80000'),
    ('Lawyer','4', '90000');

INSERT INTO employees
    (first_name, last_name, role_id, manager_id)
    VALUES
    ('Todd','Nots','1','2'),
    ('Jake','Smith','2', NULL),
    ('Jenny','Kendall','6','4'),
    ('Matt','Pomp','5', NULL),
    ('Janet','Botz','7','4'),
    ('Marshall','Mathers','8','2'),
    ('Chad','Aldrich','6','4'),
    ('Owen','Murph','6','4'),
    ('Leslie','Kimberly','1','2'),
    ('Forrest','Knot','4', NULL);
