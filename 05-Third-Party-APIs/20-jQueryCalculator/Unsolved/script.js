let isFirst = true;

let NumberClicked = (num) => {
    console.log(num);
    let div = (isFirst) ? $("#first-number") : $("#second-number");
    div.append(num);
}

let OperatorClicked = (sign) => {
    $("#operator").html(sign);
    isFirst = false;
}

let Calculate = () => {
    let num1 = parseInt($("#first-number").html());
    let num2 = parseInt($("#second-number").html());
    let operator = $("#operator").html();
    
    switch (operator){
        case "+": $("#result").html(String(num1 + num2)); break;
        case "*": $("#result").html(String(num1 * num2)); break;
        case "/": $("#result").html(String(num1 / num2)); break;
        case "^": $("#result").html(String(num1 ** num2)); break;
        case "-": $("#result").html(String(num1 - num2)); break;
    }

}

let Clear = () => {
    isFirst = true;
    $("#first-number, #second-number, #operator, #result").empty();
}

$(document).ready(() => {
    $("#button-1").on("click", (e) => NumberClicked(e.target.textContent));
    $("#button-2").on("click", (e) => NumberClicked(e.target.textContent));
    $("#button-3").on("click", (e) => NumberClicked(e.target.textContent));
    $("#button-4").on("click", (e) => NumberClicked(e.target.textContent));
    $("#button-5").on("click", (e) => NumberClicked(e.target.textContent));
    $("#button-6").on("click", (e) => NumberClicked(e.target.textContent));
    $("#button-7").on("click", (e) => NumberClicked(e.target.textContent));
    $("#button-8").on("click", (e) => NumberClicked(e.target.textContent));
    $("#button-9").on("click", (e) => NumberClicked(e.target.textContent));
    $("#button-0").on("click", (e) => NumberClicked(e.target.textContent));

    $("#button-plus").on("click", (e) => OperatorClicked(e.target.textContent));
    $("#button-minus").on("click", (e) => OperatorClicked(e.target.textContent));
    $("#button-divide").on("click", (e) => OperatorClicked(e.target.textContent));
    $("#button-multiply").on("click", (e) => OperatorClicked(e.target.textContent));
    $("#button-power").on("click", (e) => OperatorClicked(e.target.textContent));

    $("#button-equal").on("click", (e) => Calculate());
    $("#button-clear").on("click", (e) => Clear());
});