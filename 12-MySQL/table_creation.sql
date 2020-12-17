use employee_tracker_db;

create table department (
	id int auto_increment,
    name varchar(30) not null,
    primary key(id)
);

create table role (
	id int auto_increment,
    title varchar(30) not null,
    salary decimal(16,2) not null,
    department_id int not null,
    primary key(id),
    foreign key(department_id) REFERENCES department(id)
);

create table employee (
	id int auto_increment,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    role_id int not null,
    manager_id int null,
    primary key(id),
    foreign key(role_id) REFERENCES role(id),
    foreign key(manager_id) REFERENCES employee(id)
);
