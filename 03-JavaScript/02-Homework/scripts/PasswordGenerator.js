var numeric = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var specialcharacters = ["!", "%", "&", ",", "*", "+", "-", ".", "/", "<", ">", "?","~"];
var lowercase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var uppercase = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

function PasswordGenerator()
{
    do{
        var len = prompt("Please enter the lenght (least 8 characters and no more than 128 characters) of the password");
    } while (isNaN(len) || !(len >= 8  && len <=128))

    var chars = `Please select the character types to include in the password
                    Enter 1: lowercase,
                    Enter 2: numeric,
                    Enter 3: special characters
                Enter 1,2,3 to include all three
                Enter 1,3 to include lowercase and special characters`;
    var charPrompt = prompt(chars);
    charPrompt = charPrompt.replace(/\s/g, '');
    var charSelection = charPrompt.split(",");
    
    types = ["lowercase", "numeric", "specialcharacters"];
    selectedTypes = [];

    charSelection.forEach(char => {
        switch(char){
            case "1": selectedTypes.push(lowercase); break;
            case "2": selectedTypes.push(numeric); break;
            case "3": selectedTypes.push(specialcharacters); break;
        }
    });

    if(selectedTypes.length == 0) selectedTypes.push(uppercase);
    var password = "";

    do{
        var selection = selectedTypes[Math.floor(Math.random() * selectedTypes.length)];
        password = password + (String(selection[Math.floor(Math.random() * selection.length)]));
    }while(password.length<len)
    document.querySelector("#passwordText").innerHTML = password;

}


