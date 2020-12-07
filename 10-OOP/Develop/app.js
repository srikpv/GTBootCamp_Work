const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Choice = require("inquirer/lib/objects/choice");
const { listenerCount } = require("process");
const { get } = require("http");

let employees = [];

let getAllValues = (object) => {
    values = [];
    for(let i in object)
        values.push(object[i]);
    return values;
}

let getEmployee = (type, param1, param2, param3, param4) => {
    //console.log(type,  param1, param2, param3, param4);
    switch(type){
        case "Engineer" : return (new Engineer(param1, param2, param3, param4)); break;
        case "Intern" : return (new Intern(param1, param2, param3, param4)); break;
        case "Manager" : return (new Manager(param1, param2, param3, param4)); break;
    }
}

let getPrompt = (object) => {
    let prompt = [];
    for(property of Object.getOwnPropertyNames(object)){
        let question = {
            name: property,
            type: "input",
            message: `Please enter ${property} for ${object.getRole()}: `,
        }
        prompt.push(question);
    }
    return prompt;
}

let askChoice = async _ => {
    let prompt = await inquirer.prompt([{
                        name: "choice",
                        type: "list",
                        message: "Please select your choice:",
                        choices: ["Engineer", "Intern", "No more employees"],
                    }]);
    return prompt;                    
}

let buildEmployee = async (type) => {
    let employee = getEmployee(type);
    const answers = await inquirer.prompt(getPrompt(employee));
    return answers;
}
let addEmployee = async (choice) => {
    employee_answers = await buildEmployee(choice);
    employee = await getEmployee(choice, ...(getAllValues(employee_answers)));
    employees.push(employee);
}

let buildTeam = async _ =>{

    let employee_answers = await buildEmployee("Manager");
    let employee = await getEmployee("Manager", ...(getAllValues(employee_answers)));
    employees.push(employee);
    let choices = await askChoice();
    let [choice] = await getAllValues(choices);
    while(choice != "No more employees"){
        await addEmployee(choice);
        choices = await askChoice();
        [choice] = await getAllValues(choices);
    }
}

let buildHTML = async _ =>{
    await buildTeam();
    let HTML = await render(employees);
    fs.writeFile(outputPath, HTML, err => {
        if (err) {
          console.error(err);
          return;
        }
        //file written successfully
      });
}

buildHTML();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
