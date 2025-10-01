let currentInput = "0";

// ban đầu màn hình
function updateDisplay() {
    document.getElementById("screen").innerText = currentInput;
}

function updateSeDisplay() {
    document.getElementById("screen-second").innerText = currentInput;
}

function appendValue(value) {
    // gọi các dấu + - * / để làm điều kiện so sánh
    const operators = ['+', '-', '*', '/'];
    const lastdemi = String(currentInput).slice(-1);
    console.log(lastdemi)
    if (value === "x") value = '*'
    if (value === ":") value = '/'

    if (operators.includes(value)) {  // nếu đang bấm dấu + - * /
        if (operators.includes(lastdemi)) {
            let secondCurent = currentInput.replace(/.$/, value);
            currentInput = secondCurent
        } else { currentInput += value }  // nếu ký tự cuối cùng cũng là dấu thì không cho nhập tiếp
        // sau operators nhập số
        updateDisplay();
        return;
    }
    // nếu là number thì sẽ nhập number
    if (currentInput === "0") currentInput = value
    else {
        currentInput += value
    }
    updateDisplay();
}

function calc() {
    let stringResult = currentInput
    console.log(stringResult)
    updateSeDisplay()
    let validateWhiteList = /^[0-9+\-*/().\s]+$/;  // cho một biến nhận điều kiện chỉ được tính (text không nhận)
    if (validateWhiteList.test(currentInput)) { // nếu mà currentinput nhập có cái đó
        // let ketQua = eval (currentInput)
        let ketQua = Function('"use strict"; return (' + currentInput + ')')();
        currentInput = ketQua;
        console.log(ketQua)
        updateDisplay();
        return;
    } else {
        console.log("err")
        let currentInput = "error"
        let stringResult = ""
        document.getElementById("screen").innerText = currentInput;
        document.getElementById("screen-second").innerText = stringResult;
        return;
    }
}

// calc (vers 2): auto  parse (tokenize → shunting-yard → tính postfix).

// số thập phân
function appendDecimal() {
    // Lấy tất cả ký tự sau operator cuối cùng
    let lastNumber = currentInput.split(/[\+\-\*\/]/).pop();

    // Nếu số cuối cùng chưa có dấu ., mới cho phép thêm
    if (!lastNumber.includes('.')) {
        currentInput += '.';
    }
    updateDisplay();
}

//chuyển đổi dấu +/-
function toggleSign() {
    const operators = ['+', '-', '*', '/'];
    const lastChar = currentInput.slice(-1);

    // nếu ký tự cuối là toán tử → bỏ qua
    if (operators.includes(lastChar)) return;
    if (currentInput === '0' || currentInput === '-0') return;

    // nếu chỉ có một số → toggle trực tiếp
    if (
        currentInput.indexOf('+') === -1 &&
        currentInput.indexOf('-') === -1 &&
        currentInput.indexOf('*') === -1 &&
        currentInput.indexOf('/') === -1
    ) {
        currentInput = currentInput.startsWith('-')
            ? currentInput.slice(1)
            : '-' + currentInput;
        updateDisplay();
        return;
    }

    // tìm toán tử cuối
    let lastOpIndex = Math.max(
        currentInput.lastIndexOf('+'),
        currentInput.lastIndexOf('-'),
        currentInput.lastIndexOf('*'),
        currentInput.lastIndexOf('/')
    );

    let beforeOp = currentInput.slice(0, lastOpIndex);       // ví dụ: "5"
    let op = currentInput[lastOpIndex];                // ví dụ: "+"
    let afterOp = currentInput.slice(lastOpIndex + 1);      // ví dụ: "5" hoặc "(-5)"

    if (op === '+' || op === '-') {
        // đổi dấu toán tử
        op = (op === '+') ? '-' : '+';
        currentInput = beforeOp + op + afterOp;
    } else {
        // * hoặc / thì toggle số cuối
        if (afterOp.startsWith('(-') && afterOp.endsWith(')')) {
            afterOp = afterOp.slice(2, -1); // bỏ ngoặc
        } else if (afterOp.startsWith('-')) {
            afterOp = afterOp.slice(1); // "-5" → "5"
        } else {
            afterOp = `(-${afterOp})`;  // "5" → "(-5)"
        }
        currentInput = beforeOp + op + afterOp;
    }

    updateDisplay();
}

// chuyển đổi dấu % 
function percentage() {
    let operators = ['+', '-', '*', '/'];
    let lastChar = currentInput.slice(-1);

    // Nếu ký tự cuối là toán tử thì bỏ qua
    if (operators.includes(lastChar)) {
        return;
    }

    // Tìm toán tử cuối cùng
    let lastOpIndex = Math.max(
        currentInput.lastIndexOf('+'),
        currentInput.lastIndexOf('-'),
        currentInput.lastIndexOf('*'),
        currentInput.lastIndexOf('/')
    );

    if (lastOpIndex === -1) {
        // chỉ có 1 số → lấy luôn
        currentInput = (parseFloat(currentInput) / 100).toString();
    } else {
        // có toán tử → lấy số sau toán tử
        let before = currentInput.slice(0, lastOpIndex + 1);
        let after = currentInput.slice(lastOpIndex + 1);

        if (after === "") return; // chưa nhập số sau dấu

        currentInput = before + (parseFloat(after) / 100).toString();
    }
    updateDisplay();
}

function clearCal() {
    currentInput = "0"
    secondIn = ""
    document.getElementById("screen-second").innerText = secondIn;
    updateDisplay();
}

updateDisplay(); // Hiển thị lần đầu


