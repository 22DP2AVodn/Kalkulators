let currentExpression = "";
let history = JSON.parse(localStorage.getItem("history")) || [];

function appendValue(value) {
    const display = document.getElementById("display");
    currentExpression += value;
    display.value = formatNumberWithCommas(currentExpression);
    adjustFontSize();
}

function clearDisplay() {
    currentExpression = "";
    document.getElementById("display").value = "";
    document.getElementById("display").style.fontSize = "2.5em";
}

function calculate() {
    try {
        const result = eval(currentExpression);
        addToHistory(currentExpression, result);
        currentExpression = result.toString();
        document.getElementById("display").value = formatNumberWithCommas(result.toString());
        adjustFontSize();
    } catch (e) {
        document.getElementById("display").value = "Error";
        setTimeout(() => clearDisplay(), 1500);
    }
}

function toggleSign() {
    if (currentExpression.startsWith("-")) {
        currentExpression = currentExpression.substring(1);
    } else {
        currentExpression = "-" + currentExpression;
    }
    document.getElementById("display").value = formatNumberWithCommas(currentExpression);
    adjustFontSize();
}

function addToHistory(expression, result) {
    const historyEntry = `${expression} = ${formatNumberWithCommas(result.toString())}`;
    history.push(historyEntry);
    localStorage.setItem("history", JSON.stringify(history));
    updateHistory();
}

function updateHistory() {
    const historyList = document.getElementById("history");
    historyList.innerHTML = "";
    history.forEach(entry => {
        const li = document.createElement("li");
        li.textContent = entry;
        historyList.appendChild(li);
    });
}

function clearHistory() {
    history = [];
    localStorage.removeItem("history");
    updateHistory();
}

document.addEventListener("DOMContentLoaded", updateHistory);

function formatNumberWithCommas(numberStr) {
    let number = numberStr.replace(/,/g, "");
    if (!isNaN(number) && number !== '') {
        return Number(number).toLocaleString();
    }
    return numberStr;
}

function adjustFontSize() {
    const display = document.getElementById('display');
    const length = display.value.length;

    if (length <= 10) {
        display.style.fontSize = '2.5em';
    } else if (length <= 15) {
        display.style.fontSize = '2em';
    } else if (length <= 20) {
        display.style.fontSize = '1.5em';
    } else if (length <= 25) {
        display.style.fontSize = '1.2em';
    } else {
        display.style.fontSize = '1em';
    }
}
