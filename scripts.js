let currentInput = "0";
let hasop = false;

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
    console.log (lastdemi)
    if (value === "x") value = '*'
    if (value === ":") value = '/'
 
    if (operators.includes(value)){  // nếu đang bấm dấu + - * /
        if(operators.includes(lastdemi)) return; // nếu ký tự cuối cùng cũng là dấu thì không cho nhập tiếp
        currentInput += value // sau operators nhập số
        hasop = false // sau khi nhập số thì được bấm dấu tiếp
        updateDisplay();
        return;
    } 

    // nếu là number thì sẽ nhập number
    if (currentInput === "0") currentInput = value
    else{
        currentInput += value
    } 
    updateDisplay();
}

function calc() {
    let stringResult = currentInput
    console.log(stringResult)
    updateSeDisplay()
    let ketQua = eval(currentInput)
    currentInput = ketQua;
    updateDisplay();
}

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
function percentage() {
    currentInput = (parseFloat(currentInput) / 100);
    updateDisplay();
}

function clearCal() {
    currentInput = "0"
    secondIn = ""
    document.getElementById("screen-second").innerText = secondIn;
    updateDisplay();
}

updateDisplay(); // Hiển thị lần đầu


