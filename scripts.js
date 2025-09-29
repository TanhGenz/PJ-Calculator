let currentInput = "0"
let operator = null

// ban đầu màn hình
function updateDisplay() {
    let display = document.getElementById("screen");
    if (operator === null) {
        display.innerText = currentInput;
    } else if (operator != null) {
        display.innerText = `${previousInput} ${operator} ${currentInput}`;
    }
}

// nhập số
function appendNumber(number) {
    if (currentInput === "0") {
        currentInput = number;
    } else {
        currentInput += number;
    }
    updateDisplay(); // Gọi hàm render lại màn hình
}

// số thập phân
function appendDecimal() {
    if (!currentInput.includes('.')) {  
        currentInput += '.';
    }
    updateDisplay();
}

// chuyển đổi dấu +/-
function toggleSign() {
    if (currentInput.startsWith('-')) {
        currentInput.slice('1') // đang có hiện 5 cắt ra thêm dấu trừ đằng trước là -5
    }
    else {
        currentInput = '-' + currentInput
    }
    updateDisplay();
}

// chuyển đổi dấu % 
function percentage (){
    currentInput = (parseFloat(currentInput)/100);
    updateDisplay();
}

// nhập phép tính hiển thị + - x /
function appendOperator(op) {
    operator = op;
    if (operator != null) {
        previousInput = currentInput
        currentInput = " "
        previousInput + currentInput
    }
    updateDisplay(); // Gọi hàm render lại màn hình
}

function calc(){
    let current = parseInt(currentInput)
    let previous = parseInt (previousInput)
    switch (operator){
        case "+":

    }
}




function clearCal() {
    currentInput = "0"
    previousInput = ""
    operator = null
    updateDisplay();
}



updateDisplay(); // Hiển thị lần đầu
clearCal()

