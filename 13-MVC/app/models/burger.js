const ORM = require("../config/orm.js");

class Burger{
    constructor(id, name, devoured){
        this.id = id;
        this.name = name;
        this.devoured = devoured;
    }

    static async findAll() { 
        let burgers_obj = await ORM.findAll();
        let burgers = [];
        burgers_obj.forEach((burger) => burgers.push(new Burger(burger.id, burger.name, burger.devoured)));
        return await burgers; 
    }
    static async add_burger(name) { 
        let add = await ORM.add_burger(name);   
        return "S";
    }
    static async devour_burger(id) { 
        let update = await ORM.devour_burger(id);   
        return "S";
    }
}

module.exports = Burger;