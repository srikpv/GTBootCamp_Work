const { v4: uuidv4 } = require('uuid');
const fs = require("fs");
var path = require("path");

const note_file = "./db.json";

class Data{
    static get_data(){
        let raw_data = fs.readFileSync(path.join(__dirname, note_file));
        return JSON.parse(raw_data);
    }

    static write_data(json_data){
        let data = JSON.stringify(json_data, null, 2);
        fs.writeFileSync(path.join(__dirname, note_file), data);
    }

    static get_note(note_id){
        let data = this.get_data();
        return data.filter(note => note.id === note_id);
    }

    static add_note(title, text){
        let note = {};
        note.id = uuidv4();
        note.title = title;
        note.text = text;        
        
        let data = this.get_data();
        data.push(note);
        this.write_data(data);
        return this.get_data();
    }

    static delete_note(note_id){
        let data = this.get_data();
        this.write_data(data.filter(note => note.id != note_id));
    }
}

module.exports = Data;
