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
    console.log(`${a} ${operator} ${b}`);
    if(operator == "+") {
        return add(a, b);
    }
    if(operator == "-") {
        return subtract(a, b);
    }
    if(operator == "*") {
        return multiply(a, b);
    }
    if(operator == "/") {
        return divide(a, b);
    }
}

function evaluate(str) {
    let nums = str.split(/[^\d.]/);
    //first pass (multiplication & division)
    let i = 0;
    while(i < opSequence.length) {
        if(opSequence[i] == "*" || opSequence[i] == "/") {
            let temp = operate(opSequence.splice(i, 1), nums[i], nums[i+1]);
            nums[i+1] = temp.toString();
            nums.splice(i, 1);
        } else {
            i++;
        }
    }

    i = 0;
    while(opSequence.length > 0) {
        if(opSequence[i] == "+" || opSequence[i] == "-") {
            let temp = operate(opSequence.splice(i, 1), +nums[i], +nums[i+1]);
            nums[i+1] = temp;
            nums.splice(i, 1);
        } else {
            i++;
        }
    }
    return Math.round(nums[0] * 100000000) / 100000000;
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
        disp.textContent = evaluate(disp.textContent);
        opSequence = [];
        lastOpeIndex = -1;
        hasDecimal = false;
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