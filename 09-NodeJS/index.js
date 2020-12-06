const inquirer = require("inquirer");
const fs = require("fs");

let licenses = new Map(
    [["Twitter", "https://img.shields.io/twitter/url?style=flat-square&url=https%3A%2F%2Ftwitter.com%2Fsrikpv"],
    ["GitHub", "https://img.shields.io/github/followers/srikpv?style=social"],
    ["Requirements", "https://img.shields.io/requires/github/srikpv/GTBootCamp_Work"]]
                    );
const licenses_iterator = licenses.keys();



let titles = new Map (
    [["title", "Title"],
    ["description", "Description"],
    ["installation_instructions" , "Installation"],
    ["usage_information" , "Usage"],
    ["contribution_guidelines" , "Contributing"],
    ["test_instructions" , "Tests"],
    ["licenses" , "Licenses"],
    ["questions" , "Questions"],
    ["user_name" , "Questions"],
    ["email" , "Questions"]]
);
const titles_iterator = titles.keys();
//Title, 
// Description, 
// Table of Contents, 
// Installation, 
// Usage, 
// License, ---------list and badge
// Contributing, 
// Tests, 
// Questions -----Github username, email address, 

let printTitle = (text) => `# ${text}\n`;
let printSubTitle = (text) => `## ${text}\n`;
let printText = (text) => `${text}\n`;
let printListItem = (text) => `* [${text}](#${text.toLowerCase()})`;
let printImage = (text) => `[${text}](${text})`;

inquirer
  .prompt([
    {
      name: titles_iterator.next().value,
      type: "input",
      message: "Title: ",
    },
    {
      name: titles_iterator.next().value,
      type: "input",
      message: "Description: ",
    },
    {
        name: titles_iterator.next().value,
        type: "input",
        message: "Installation Instructions: ",
    },
    {
        name: titles_iterator.next().value,
        type: "input",
        message: "Usage Information: ",
    },
    {
        name: titles_iterator.next().value,
        type: "input",
        message: "Contribution Guidelines: ",
    },
    {
        name: titles_iterator.next().value,
        type: "input",
        message: "Test Instructions: ",
    },
    {
        name: titles_iterator.next().value,
        type: "checkbox",
        message: "Licenses: ",
        choices: new Array(licenses.size).fill().map(value => licenses_iterator.next().value),
    },
    {
        name: "user_name",
        type: "input",
        message: "GitHub Username: ",
    },
    {
        name: "project_name",
        type: "input",
        message: "GitHub Project: ",
    },
    {
        name: "email",
        type: "input",
        message: "Email: ",
    },
  ])
  .then((readme) => {
    
    let file_contents = [];
    for(let node in readme){
        switch(node){
            case "title": 
                file_contents.push(printTitle(readme[node]));
                break;
            case "description": 
                file_contents.push(printSubTitle(titles.get(node)));
                file_contents.push(printText(readme[node]));
                file_contents.push(printSubTitle("Table of Contents"));
                break;
            case "installation_instructions": 
                file_contents.push(printListItem(titles.get(node)));
                break;
            case "usage_information": 
                file_contents.push(printListItem(titles.get(node)));
                break;
            case "contribution_guidelines": 
                file_contents.push(printListItem(titles.get(node)));
                break;
            case "licenses": 
                file_contents.push(printListItem(titles.get(node)));
                break;
            case "test_instructions": 
                file_contents.push(printListItem(titles.get(node)));
                file_contents.push(printListItem(titles.get("questions")));
                break;
        }
    }
    for(let node in readme){
        switch(node){
            case "installation_instructions": 
                file_contents.push(printSubTitle(titles.get(node)));
                file_contents.push(printText(readme[node]));
                break;
            case "usage_information": 
                file_contents.push(printSubTitle(titles.get(node)));
                file_contents.push(printText(readme[node]));
                break;
            case "contribution_guidelines": 
                file_contents.push(printSubTitle(titles.get(node)));
                file_contents.push(printText(readme[node]));
                break;
            case "licenses": 
                file_contents.push(printSubTitle(titles.get(node)));
                for(let license of readme[node])
                    file_contents.push(printImage(licenses.get(license)));
                break;
            case "test_instructions": 
                file_contents.push(printSubTitle(titles.get(node)));
                file_contents.push(printText(readme[node]));
                break;
            case "user_name":
                file_contents.push(printSubTitle(titles.get(node)));
                file_contents.push(printText(`Repo Link: https://github.com/${readme[node]}/${readme.project_name}`));
                file_contents.push(printText(`For questions contact: ${readme.email}`));
                break;
        }        
    }

    fs.writeFile('README.md', file_contents.join("\n"), err => {
        if (err) {
          console.error(err);
          return;
        }
        //file written successfully
      });
  });