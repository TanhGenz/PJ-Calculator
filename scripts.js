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
        // nếu input kết thúc bằng toán tử hoặc dấu chấm thì sẽ = 0
        if (/[+\-*/.]$/.test(currentInput)) {
            clearCal();
            return;
        }
        // let ketQua = eval (currentInput)
        let ketQua = Function('"use strict"; return (' + currentInput + ')')();
        console.log(typeof ketQua)
        // nếu tính kết quả = 0 không cho gõ 000000
        if (ketQua === 0) {
            clearCal();
            return;
        }
        currentInput = ketQua;
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
    if (!currentInput || currentInput === '0' || currentInput === '-0') return;

    // 1) Nếu chỉ là 1 số (có/không dấu âm) → đảo dấu trực tiếp
    if (/^-?\d+(\.\d+)?$/.test(currentInput)) {
        if (currentInput.charAt(0) === '-') currentInput = currentInput.slice(1);
        else currentInput = '-' + currentInput;
        updateDisplay();
        return;
    }

    // 2) Có biểu thức: bắt toán tử cuối + toán hạng cuối (số có thể là (-n) hoặc -n hoặc n)
    //    before | op | term
    let m = currentInput.match(/^ (.*?) ([+\-*/]) (\(-?\d*\.?\d+\)|-?\d*\.?\d+) $/);
    if (!m) return; // không khớp → không xử lý
    let before = m[1];
    let op = m[2];
    let term = m[3];

    // Chuẩn hoá toán hạng cuối về dạng "số dương" + cờ isNeg
    let isNeg = false;
    let num = term;

    if (term.charAt(0) === '(') {
        // dạng "(-123)" → lấy "123", đánh dấu âm
        if (term.indexOf('(-') === 0 && term.charAt(term.length - 1) === ')') {
            num = term.slice(2, -1);
            isNeg = true;
        } else {
            // hiếm gặp: "(123)" → coi như dương
            num = term.slice(1, -1);
        }
    } else if (term.charAt(0) === '-') {
        // dạng "-123"
        num = term.slice(1);
        isNeg = true;
    } else {
        // "123"
        num = term;
        isNeg = false;
    }

    // 3) Toggle theo loại toán tử
    if (op === '+' || op === '-') {
        // Quy tắc:
        // - nếu term đang âm → giữ nguyên op, biến term thành dương
        // - nếu term đang dương → đổi op: '+' <-> '-', term giữ dương
        let newOp = isNeg ? op : (op === '+' ? '-' : '+');
        currentInput = before + newOp + num; // luôn để số dương, op quyết định dấu
    } else {
        // op là '*' hoặc '/'
        // Quy tắc:
        // - nếu term đang âm → bỏ âm (trả về dương)
        // - nếu term đang dương → bọc thành "(-num)" để an toàn ưu tiên toán tử
        if (isNeg) {
            currentInput = before + op + num;          // "12*-34" → "12*34" | "12*(-34)" → "12*34"
        } else {
            currentInput = before + op + '(-' + num + ')'; // "12*34" → "12*(-34)"
        }
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

function del() {
    if (currentInput === "0") return;
    if (currentInput.length === 1) {
        let del = currentInput.replace(currentInput, "0")
        currentInput = del;
        let secondIn = ""
        document.getElementById("screen-second").innerText = secondIn;
        updateDisplay();
        return;
    }

    currentInput = String(currentInput).slice(0, -1); // Xóa ký tự cuối cùng
    updateDisplay();
}

function handleKeyPress(event) {
    let key = event.key;
    if (/^[0-9]$/.test(key)) {
        appendValue(key);
    }

    if (key === "+") appendValue("+");
    if (key === "-") appendValue("-");
    if (key === "*") appendValue("*");
    if (key === "/") appendValue("/");

    if (key === "Backspace") del();
    if (key === "Enter" || key === "=") calc();
    if (key === "Escape") clearCal();
}
// Gán sự kiện ở ngoài
document.addEventListener("keydown", handleKeyPress);

function clearCal() {
    currentInput = "0"
    secondIn = ""
    document.getElementById("screen-second").innerText = secondIn;
    updateDisplay();
}

updateDisplay(); // Hiển thị lần đầu


