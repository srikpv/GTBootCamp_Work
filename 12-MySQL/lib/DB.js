const mysql = require("mysql");
require("dotenv").config();
const util = require( 'util' );

class DB {
    static get_connection = _ => {
        return mysql.createConnection({
            host: process.env.HOST,
          
            // Your port; if not 3306
            port: process.env.PORT,
          
            // Your username
            user: process.env.user,
          
            // Your password
            password: process.env.MYSQL_PWD,
            database: process.env.database
          });
    }

    static makeDb = _ => {
        const connection = DB.get_connection();
        return {
          query( sql, args ) {
            return util.promisify( connection.query )
              .call( connection, sql, args );
          },
          close() {
            return util.promisify( connection.end ).call( connection );
          }
        };
      }
    
    static create_department(name){
        let id = 0;
        let connection = DB.get_connection();
        var query = connection.query(
          "INSERT INTO department SET ?",
          {
            name: name
          },
          function(err, res) {
            if (err) throw err;
            id = res.insertId;
            connection.end(); 
          }
        );
        return id;
    }
    
    static create_role(title, salary, department_id){
        let id = 0;
        let connection = DB.get_connection();
        var query = connection.query(
          "INSERT INTO role SET ?",
          {
            title: title,
            salary: salary,
            department_id: department_id
          },
          function(err, res) {
            if (err) throw err;
            id = res.insertId;
            connection.end(); 
          }
        );
        return id;
    }
    
    static create_employee(first_name, last_name, role_id, manager_id){
        let id = 0;
        let connection = DB.get_connection();
        let param = {
            first_name: first_name,
            last_name: last_name,
            role_id: role_id
          };
        if(manager_id !== undefined && manager_id != 0){
            param.manager_id = manager_id;
        }   
        let query = connection.query(
            "INSERT INTO employee SET ?",
            param,
            function(err, res) {
                if (err) throw err;
                id = res.insertId;
                connection.end();  
            }
            );
        return id;
    }
     
    static async getDepartmentList() {
        let connection = DB.makeDb();
        let departments = [];
        try{
            let rows = await connection.query("SELECT * FROM department");
            for (var i = 0; i < rows.length; i++) {
                departments.push({value: rows[i].id, name: rows[i].name});
            }
        }
        catch (err) { throw err; }
        finally{
            connection.close();
            return await departments;
        }
    }

    static async getBudget(department_id) {
        let connection = DB.makeDb();
        let departments = [];
        try{
            let rows = await connection.query(`
                SELECT d.name, tblBudget.budget FROM 
                (select 
                    d.id, SUM(r.salary) budget
                from 
                    department d
                        INNER JOIN role r
                            ON r.department_id = d.id
                        INNER JOIN employee e
                            ON e.role_id = r.id
                WHERE
                    d.id = ?
                GROUP BY 
                    d.id
                )tblBudget
                INNER JOIN department d
                WHERE 
                    d.id = tblBudget.id
            `, [department_id]);
            for (var i = 0; i < rows.length; i++) {
                departments.push({name: rows[i].name, budget: rows[i].budget});
            }
        }
        catch (err) { throw err; }
        finally{
            connection.close();
            return await departments;
        }
    }

    static async getRoleList() {
        let connection = DB.makeDb();
        let roles = [];
        try{
            let rows = await connection.query("SELECT role.id, role.title, role.salary, role.department_id, department.name as department_name FROM role INNER JOIN department ON role.department_id = department.id");
            for (var i = 0; i < rows.length; i++) {
                roles.push({value: rows[i].id, name: rows[i].title, salary: rows[i].salary, department_id: rows[i].department_id, department_name: rows[i].department_name});
            }
        }
        catch (err) { throw err; }
        finally{
            connection.close();
            return await roles;
        }
    }

    static async getEmployeeList() {
        let connection = DB.makeDb();
        let employees = [];
        try{
            let rows = await connection.query(`SELECT e.id, e.first_name, e.last_name, e.role_id, r.title as role_title, e.manager_id, concat(m.first_name, ' ', m.last_name) as manager_name FROM employee e
            INNER JOIN role r
                ON r.id = e.role_id
            LEFT OUTER JOIN employee m
                ON m.id = e.manager_id
        `);
            for (var i = 0; i < rows.length; i++) {
                employees.push({value: rows[i].id, name: rows[i].first_name + " " + rows[i].last_name, first_name: rows[i].first_name, last_name: rows[i].last_name, role_id: rows[i].role_id, role_title: rows[i].role_title, manager_id: rows[i].manager_id, manager_name: rows[i].manager_name});
            }
        }
        catch (err) { throw err; }
        finally{
            connection.close();
            return await employees;
        }
    }

    static async getEmployeeListByManager(manager_id) {
        let connection = DB.makeDb();
        let employees = [];
        try{
            let rows = await connection.query(`SELECT e.id, e.first_name, e.last_name, e.role_id, r.title as role_title, e.manager_id, concat(m.first_name, ' ', m.last_name) as manager_name FROM employee e
            INNER JOIN role r
                ON r.id = e.role_id
            LEFT OUTER JOIN employee m
                ON m.id = e.manager_id
            WHERE e.manager_id = ?
        `, [manager_id]);
            for (var i = 0; i < rows.length; i++) {
                employees.push({value: rows[i].id, name: rows[i].first_name + " " + rows[i].last_name, first_name: rows[i].first_name, last_name: rows[i].last_name, role_id: rows[i].role_id, role_title: rows[i].role_title, manager_id: rows[i].manager_id, manager_name: rows[i].manager_name});
            }
        }
        catch (err) { throw err; }
        finally{
            connection.close();
            return await employees;
        }
    }

    static async getManagerList() {
        let connection = DB.makeDb();
        let employees = [];
        try{
            let rows = await connection.query(`SELECT e.id, e.first_name, e.last_name, e.role_id, r.title as role_title, e.manager_id, ('') as manager_name FROM employee e
            INNER JOIN role r
                ON r.id = e.role_id
            WHERE r.title = 'Manager'
        `);
            for (var i = 0; i < rows.length; i++) {
                employees.push({value: rows[i].id, name: rows[i].first_name + " " + rows[i].last_name, first_name: rows[i].first_name, last_name: rows[i].last_name, role_id: rows[i].role_id, role_title: rows[i].role_title, manager_id: rows[i].manager_id, manager_name: rows[i].manager_name});
            }
        }
        catch (err) { throw err; }
        finally{
            connection.close();
            return await employees;
        }
    }

    static updateRole(employee_id, role_id){
        let id = 0;
        let connection = DB.get_connection();
        var query = connection.query(
          `UPDATE employee SET role_id = ? WHERE id = ?`,
          [role_id, employee_id],
          function(err, res) {
            if (err) throw err;
            id = res.affectedRows;
            connection.end(); 
          }
        );
        return id;
    }

    static updateManager(employee_id, manager_id){
        let id = 0;
        let connection = DB.get_connection();
        var query = connection.query(
          `UPDATE employee SET manager_id = ? WHERE id = ?`,
          [manager_id, employee_id],
          function(err, res) {
            if (err) throw err;
            id = res.affectedRows;
            connection.end(); 
          }
        );
        return id;
    }

    static delete(table_name, id){
        let deleted_rows = 0;
        let connection = DB.get_connection();
        var query = connection.query(
          `DELETE FROM ${table_name} WHERE id = ?`,
          [id],
          function(err, res) {
            if (err) throw err;
            deleted_rows = res.affectedRows;
            connection.end(); 
          }
        );
        return deleted_rows;
    }    
};

module.exports = DB;
