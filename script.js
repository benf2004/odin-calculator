let num1 = "";
let num2 = "";
let focusedNumber = "num1";
let operator = "";
const display = document.querySelector(".display")

function clearDisplay(){
    num1 = "";
    num2 = "";
    focusedNumber = "num1";
    operator = "";
    updateDisplay()
}

function doOperation(num1, num2, operator){
    num1 = Number(num1)
    num2 = Number(num2)
    const operationDict = {
        "+": num1 + num2,
        "-": num1 - num2,
        "/": num1 / num2,
        "x": num1 * num2
    }
    const result = operationDict[operator];
    return Math.round(result * 1e6) / 1e6; // Round to 6th digit after decimal
}

function addDigit(digit){
    if (focusedNumber === "num1"){
        num1 = num1.toString() + digit
    }
    else {
        num2 = num2.toString() + digit
    }
    updateDisplay()
}

function updateDisplay(){
    display.innerHTML = `${num1} ${operator} ${num2}`
}

function chooseOperator(op){
    if (op === "÷") op = "/"
    if (op === "*") op = "x"
    if (num2 === "") {
        operator = op
        focusedNumber = "num2"
    }
    else {
        num1 = doOperation(num1, num2, operator)
        num2 = ""
        operator = op
        focusedNumber = "num2"
    }
    updateDisplay()
}

function calc(){
    if(num2 === "") return;
    num1 = doOperation(num1, num2, operator)
    num2 = ""
    operator = ""
    focusedNumber = "num1"
    updateDisplay()
}

function decimal(){
    if (focusedNumber === "num1") {
        if (num1.toString().includes(".")) return;
        num1 = num1.toString() + '.'
    }
    else {
        if (num2.toString().includes(".")) return;
        num2 = num2.toString() + "."
    }
    updateDisplay()
}

function deleteDig(){
    if (focusedNumber === "num1") num1 = num1.slice(0, -1)
    if (focusedNumber === "num2") num2 = num2.slice(0, -1)
    updateDisplay()
}

function handleKey(event){
    const numbers = "1234567890"
    const ops = "+-/x*÷"
    if (numbers.includes(event.key)){
        addDigit(event.key)
    }
    else if (ops.includes(event.key)){
        chooseOperator(event.key)
    }
    else if (event.key === "Enter"){
        calc()
    }
    else if (event.key === "c"){
        clearDisplay()
    }
    else if (event.key === "Delete"){
        deleteDig()
    }
    else if (event.key === "."){
        decimal()
    }
}

document.querySelectorAll(".num").forEach((btn) => {
    btn.addEventListener("click", () => addDigit(btn.innerHTML))
})

document.querySelectorAll(".op").forEach((op) => {
    op.addEventListener("click", () => chooseOperator(op.innerHTML))
})

document.body.addEventListener("keypress", (event) => handleKey(event))
document.querySelector(".do").addEventListener("click", calc)
document.querySelector(".dot").addEventListener("click", decimal)
document.getElementById("clear").addEventListener("click", clearDisplay)
document.getElementById("delete").addEventListener("click", deleteDig)