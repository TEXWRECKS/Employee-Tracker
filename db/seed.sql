use employeetracker_db;

INSERT INTO department (name, id)
VALUES
    ('Accounting', 1),
    ('Art', 2),
    ('Billing', 3),
    ('Compliance', 4),
    ('Customer Service', 5)
    ('Development', 6),
    ('Engineering', 7),
    ('Engineering Services', 8),
    ('Enterprise Architecture', 9),
    ('Facilities', 10)
    ('Field Service', 11);
    ('Finance', 12),
    ('Gaming Operations', 13),
    ('Human Resources', 14),
    ('Information Technology', 15),
    ('Legal', 16),
    ('Marketing', 17),
    ('Math', 18)
    ('Planning', 19),
    ('Production', 20),
    ('Product Management', 21),
    ('Product Support', 22),
    ('Purchasing', 23),
    ('Quality Control', 24),
    ('Sales', 25),
    ('Manufacturing', 26)
    ('Warehousing', 27),

INSERT INTO role
    (id, title, salary, department_id)
VALUES
    (1, 'Account Executive', 120000, 25),
    (2, 'Sales Account Representative', 80000, 25),
    (3, 'Director of Product Engineering', 150000, 7),
    (4, 'Software Engineer IV', 120000, 6),
    (5, 'Director of Manufacturing Operations', 100000, 25),
    (6, 'Accountant II', 70000, 1),
    (7, 'Director of Compliance', 180000, 16),
    (8, 'Lawyer', 190000, 16);
    (9, 'Procurement Manager', 85000, 23),
    (10, 'Production Planner V', 70000, 19),
    (11, 'Specialist Continuous Improvement II', 60000, 8),
    (12, 'Specialist Asset Inventory Management', 70000, 13),
    (13, 'Quality Control Inspector III', 40000, 24),


INSERT INTO employee
    (id, first_name, last_name, role_id, manager_id)
VALUES
    (1, 'John', 'Jacob', 1, NULL),
    (2, 'Mike', 'Chan', 2, 1),
    (3, 'Ashley', 'Rodriguez', 3, NULL),
    (4, 'Kevin', 'Tupik', 4, 3),
    (5, 'Kunal', 'Singh', 5, NULL),
    (6, 'Malia', 'Brown', 6, 5),
    (7, 'Sarah', 'Lourd', 7, NULL),
    (8, 'Tom', 'Allen', 8, 7);
