const inquirer = require("inquirer");
const { async } = require("rxjs");
const cTable = require('console.table');
const {Department, Role, Employee} = require("./lib/Classes");


const action_choices = ["Add", "View", "Update", "Delete", "Done"];
const add_choices = ["Department", "Role", "Employee"];
const view_choices = ["Departments", "Roles", "Employees", "Employees by Managers", "Budget"];
const update_employee = ["Role", "Manager"];
const delete_choices = ["Department", "Role", "Employee"];
const dont_ask = ["id", "department_id", "department_name", "role_id", "role_title", "manager_id", "manager_name"]

let departments = [];
let roles = [];
let employees = [];
let done = false;

let getAllValues = (object) => {
    values = [];
    for(let i in object)
        values.push(object[i]);
    return values;
}

let getObject = (type, param1, param2, param3, param4, param5) => {
    switch(type){
        case "Department" : return (new Department(param1, param2)); break;
        case "Role" : return (new Role(param1, param2, param3, param4)); break;
        case "Employee" : return (new Employee(param1, param2, param3, param4, param5)); break;
    }
}

let getPrompt = async (object) => {
    let prompt = [];
    let question;
    for(property of Object.getOwnPropertyNames(object)){
        if(!dont_ask.includes(property)){
            question = {
                name: property,
                type: "input",
                message: `Please enter ${property.toUpperCase()}: `,
            };
            prompt.push(question);
        }
    }
    switch(object.getType()){
        case "Role":
            departments = await Department.getDepartmentList();
            if(departments.length > 0){
                question = {
                    name: "department",
                    type: "list",
                    message: "Please select the DEPARTMENT:",
                    choices: departments,
                };
                prompt.push(question);
            }
            break;
        case "Employee":
            roles = await Role.getRoleList();
            if(roles.length > 0){
                question = {
                    name: "role",
                    type: "list",
                    message: "Please select the ROLE:",
                    choices: roles,
                };
                prompt.push(question);
            }
            employees = await Employee.getEmployeeList();
            if(employees.length > 0){
                question = {
                    name: "manager",
                    type: "list",
                    message: "Please select the MANAGER:",
                    choices: employees,
                };
                prompt.push(question);
            }
            break;
    }
    return prompt;
}

let createObject = async (obj) =>{
    let data = await inquirer.prompt(await getPrompt(obj));
    let data_obj = await getAllValues(data);
    switch(obj.getType()){
        case "Department": 
            let department = Department.create_department(...data_obj); 
            break;
        case "Role":
            let role = Role.create_role(...data_obj);
            break;
        case "Employee":
            let employee = Employee.create_employee(...data_obj);
            break;
    }
}

let deleteFunction = async (delete_type) => {
    let d;
    switch(delete_type){
        case "Department": 
            departments = await Department.getDepartmentList();
            let department_id = await returnChoice(departments, "department", "Please select the DEPARTMENT to delete: ");
            d = await Department.deleteDepartment(department_id);
            break;
        case "Role":
            roles = await Role.getRoleList();
            let role_id = await returnChoice(roles, "role", "Please select the ROLE to delete: ");
            d = await Role.deleteRole(role_id);
            break;
        case "Employee":
            employees = await Employee.getEmployeeList();
            let employee_id = await returnChoice(employees, "employee", "Please select the EMPLOYEE to delete: ");
            d = await Employee.deleteEmployee(employee_id);
            break;
    }
}

let updateEmployee = async _ => {
    employees = await Employee.getEmployeeList();
    let employee_id = await returnChoice(employees, "employee", "Please select the EMPLOYEE to edit: ");
    let update_choice = await returnChoice(update_employee, "choice", "Please select the CHOICE to edit: ");
    switch(update_choice){
        case "Role":
            roles = await Role.getRoleList();
            let role_id = await returnChoice(roles, "role", "Please select the ROLE: ");
            Employee.updateRole(employee_id, role_id);
            break;
        case "Manager":
            employees = await Employee.getEmployeeList();
            let manager_id = await returnChoice(employees, "manager", "Please select the MANAGER: ");
            Employee.updateManager(employee_id, manager_id);
            break;
    }
}

let view_functions = {
    "Departments" : async function() {
        departments = await Department.getDepartmentList();
        console.log();
        console.table(departments);
    }, 
    "Roles" : async function() {
        roles = await Role.getRoleList();
        console.log();
        console.table(roles);
    }, 
    "Employees" : async function() {
        employees = await Employee.getEmployeeList();
        console.log();
        console.table(employees);
    },
    "Employees by Managers" : async function() {
        let managers = await Employee.getManagerList();
        let manager_id = await returnChoice(managers, "manager_choice", "Please select the MANAGER: ");
        let employees_by_manager = await Employee.getEmployeeListByManager(manager_id);
        console.log();
        console.table(employees_by_manager);
    },
    "Budget" : async function() {
        departments = await Department.getDepartmentList();
        let department_id = await returnChoice(departments, "department", "Please select the DEPARTMENT: ");
        let budget = await Department.getBudget(department_id);
        console.log();
        console.table(budget);
    }
}

let askChoice = async (choices, name, message_text) => {
    name = (name == undefined) ? "choice" : name;
    message_text = (message_text == undefined) ? "Please select your choice: " : message_text;
    let prompt = await inquirer.prompt([{
                        name: name,
                        type: "list",
                        message: message_text,
                        choices: choices,
                    }]);
    return prompt;                    
}

let returnChoice = async (choices, name, message_text) => {
    let ask_choices = await askChoice(choices, name, message_text);
    let [choice] = await getAllValues(ask_choices);
    return choice;
}

let buildORG = async _ => {
    let choice = "";
    choice = await returnChoice(action_choices);
    switch(choice){
        case "Add":
            let add_type = await returnChoice(add_choices, "add", "Please select to ADD: ");
            let obj = getObject(add_type);
            await createObject(obj);
            break;
        case "View":
            let view_type = await returnChoice(view_choices, "view", "Please select to VIEW: ");
            view_functions[view_type]();
            break;
        case "Update":
            updateEmployee();
            break;
        case "Delete":
            let delete_type = await returnChoice(delete_choices, "delete", "Please select to DELETE: ");
            await deleteFunction(delete_type);
            break;
        case "Done":
            done = true;
            break;
    }
}

buildORG();

process.on('beforeExit', function () {
    if(!done)
        buildORG();
  });