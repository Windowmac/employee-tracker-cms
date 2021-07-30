INSERT INTO departments (name)
VALUES ("R & D"),
       ("Sales"),
       ("HR");

INSERT INTO roles (title, salary, department_id)
VALUES ("R&D Manager", 10.00, 1),
       ("Sales Manager", 15.00, 2),
       ("HR Manager", 20.00, 3),
       ("Scientist", 9.00, 1),
       ("Associate", 18.00, 2),
       ("Representative", 12.00, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("George", "MeHarris", 1, 1),
       ("George", "Takei", 4, 1),
       ("Melinda", "Gates", 2, 3),
       ("Bill", "Gates", 5, 3),
       ("Ron", "Johnson", 3, 5),
       ("Simple", "Sam", 6, 5);