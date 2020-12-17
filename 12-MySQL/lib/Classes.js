const DB = require("./DB");

class Department{
    constructor(id, name){
        this.id = id;
        this.name = name;
    }
    static getDepartment(id){ return DB.getDepartment(id); }
    static create_department(name){ 
        let id = DB.create_department(name);
        return id;
    }
    getType() { return "Department"; }
    static async getDepartmentList() { 
        let departments = await DB.getDepartmentList();   
        return await departments;
    }
    static async getBudget(department_id) { 
        let budget = await DB.getBudget(department_id);   
        return await budget;
    }
    static deleteDepartment(id){
        DB.delete("department", id);
    }
}

class Role{
    constructor(id, title, salary, department_id, department_name){
        this.id = id;
        this.title = title;
        this.salary = salary;
        this.department_id = department_id;
        this.department_name = department_name;
    }
    static getRole(id){ return DB.getRole(id); }
    static create_role(title, salary, department_id) { 
        let id = DB.create_role(title, salary, department_id);
        return id; 
    }
    static async getRoleList() { 
        let roles = await DB.getRoleList();   
        return await roles;
    }
    getType() { return "Role"; }
    static deleteRole(id){
        DB.delete("role", id);
    }
}

class Employee{
    constructor(id, first_name, last_name, role_id, role_title, manager_id, manager_name){
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.role_id = role_id;
        this.role_title = role_title;
        this.manager_id = manager_id;
        this.manager_name = manager_name;
    }
    static getEmployee(id) { return DB.getEmployee(id); }
    static create_employee(first_name, last_name, role_id, manager_id) { 
        let id = DB.create_employee(first_name, last_name, role_id, manager_id);
        return id; 
    }
    static async getEmployeeList() { 
        let employees = await DB.getEmployeeList();   
        return await employees;
    }
    static async getEmployeeListByManager(manager_id) { 
        let employees = await DB.getEmployeeListByManager(manager_id);   
        return await employees;
    }
    static async getManagerList() { 
        let managers = await DB.getManagerList();   
        return await managers;
    }
    getType() { return "Employee"; }
    static updateRole(employee_id, role_id){
        DB.updateRole(employee_id, role_id);
    }
    static updateManager(employee_id, manager_id){
        DB.updateManager(employee_id, manager_id);
    }
    static deleteEmployee(id){
        DB.delete("employee", id);
    }
}

module.exports = {
    Department : Department,
    Role : Role,
    Employee : Employee
}