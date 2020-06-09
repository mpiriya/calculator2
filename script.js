let hasDecimal = false; //bool
let currNum = 0;
let lastOpIndex = -1;
const OPS = ["+", "-", "*", "/"]
let opSequence = [];

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

// dividend / divisor
function divide(dividend, divisor) {
    //check for divisor = 0
    if(divisor == 0) {
        return "Error";
    }
    return Math.round(dividend / divisor * 100000000) / 100000000;
}

function operate(operator, a, b) {
    if(operator == "add") {
        return add(a, b);
    }
    if(operator == "subtract") {
        return subtract(a, b);
    }
    if(operator == "multiply") {
        return multiply(a, b);
    }
    if(operator == "divide") {
        return divide(a, b);
    }
}

function evaluate(str, disp) {
    let nums = str.split(/[^\d.]/);

    disp.textContent = -1;
    opSequence = [];
    lastOpeIndex = -1;
    hasDecimal = false;
}

function display(val, disp) {

    if(!isNaN(+val)) {
        //edit currNum
        disp.textContent += val;
    } else if(val == ".") {
        if(!hasDecimal) {
            disp.textContent += val;
            hasDecimal = true;
        }
    } else if(val != "=") {
        console.log(val);
        if(!OPS.includes(disp.textContent.slice(-1))) { 
            opSequence.push(val);
            disp.textContent += val;
            lastOpIndex = disp.textContent.length - 1;
            hasDecimal = false;
        }
    } else {
        evaluate(disp.textContent, disp);
    }
}

window.onload = () => {
    const buttons = document.querySelectorAll(".calcButton");
    const disp = document.querySelector(".display");
    for(let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', () => {
            display(buttons[i].getAttribute("id"), disp);
        });
    }

    document.querySelector("#clear").addEventListener("click", () => {
        disp.textContent = "";
    });

    document.querySelector("#backspace").addEventListener("click", () => {
        disp.textContent = disp.textContent.substring(0, disp.textContent.length - 1);
    });
}