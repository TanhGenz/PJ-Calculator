let currentInput = "0"


// ban đầu màn hình
function updateDisplay() {
    document.getElementById("screen").innerText = currentInput;
}

function appendValue(value) {
    if (value === "x") value = '*'
    if (value === ":") value = '/'

    if (currentInput === "0") currentInput = value;
    else currentInput += value;
    updateDisplay();
}

function calc() {
    let ketQua = eval(currentInput)
    currentInput = ketQua;
    updateDisplay();
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
function percentage() {
    currentInput = (parseFloat(currentInput) / 100);
    updateDisplay();
}

function clearCal() {
    currentInput = "0"
    updateDisplay();
}

updateDisplay(); // Hiển thị lần đầu


