const display = document.getElementById('display');
const sideMenu = document.getElementById('sideMenu');
const menuToggle = document.getElementById('menuToggle');
const calcContainer = document.getElementById('calcContainer');

// Toggle Menu
menuToggle.onclick = () => sideMenu.classList.toggle('active');

// MODE SWITCHER
function switchMode(mode) {
    if (mode === 'scientific') {
        calcContainer.classList.add('mode-sci');
    } else {
        calcContainer.classList.remove('mode-sci');
    }
    sideMenu.classList.remove('active');
}

// Math Functions
function appendToDisplay(input) {
    if (display.value === "0") display.value = input;
    else display.value += input;
}

function clearDisplay() { display.value = "0"; }
function deleteLast() { display.value = display.value.slice(0, -1) || "0"; }

function mathFunction(type) {
    try {
        let val = eval(display.value);
        if (type === 'sin') display.value = Math.sin(val);
        if (type === 'cos') display.value = Math.cos(val);
        if (type === 'tan') display.value = Math.tan(val);
        if (type === 'sqrt') display.value = Math.sqrt(val);
        if (type === 'log') display.value = Math.log10(val);
    } catch { display.value = "Error"; }
}

function calculate() {
    try {
        display.value = eval(display.value.replace(/×/g, '*'));
    } catch { display.value = "Error"; }
}

document.getElementById('aboutBtn').onclick = () => alert("© 2026 DragonOS Calculator v1.0");
