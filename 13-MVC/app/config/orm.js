// Import MySQL connection.
const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
var mysql = require("mysql");
var Burger = require("../models/burger.js");
const util = require( 'util' );

class ORM {

    static get_connection = _ => {
        return mysql.createConnection({
            host: process.env.HOST,
          
            // Your port; if not 3306
            port: process.env.DB_PORT,
          
            // Your username
            user: process.env.USER_NAME,
          
            // Your password
            password: process.env.PASS_WORD,
            database: process.env.DATABASE
          });
    }

    static makeDb = _ => {
        let connection = ORM.get_connection();
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

      static async add_burger(name) {
        let connection = ORM.makeDb();
        try{
            let query = await connection.query(`
                INSERT INTO burger (name, devoured) VALUES (? , ?)
            `, [name, 0]);
            return await query;
        }
        catch (err) { throw err; }
        finally{
            connection.close();
        }
    }

    static async findAll() {
        let connection = ORM.makeDb();
        let burgers = [];
        try{
            let rows = await connection.query("SELECT * FROM burger");
            for (var i = 0; i < rows.length; i++) {
                burgers.push({id: rows[i].id, name: rows[i].name, devoured: rows[i].devoured});
            }
        }
        catch (err) { throw err; }
        finally{
            connection.close();
            return await burgers;
        }
    }

    static async devour_burger(id) {
        let connection = ORM.makeDb();
        try{
            let query = await connection.query(`
                UPDATE burger b set b.devoured = 1
                WHERE b.id = ?
            `, [id]);
            return await query;
        }
        catch (err) { throw err; }
        finally{
            connection.close();
        }
    }
}

module.exports = ORM;