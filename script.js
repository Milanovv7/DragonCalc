const display = document.getElementById('display');
const sideMenu = document.getElementById('sideMenu');
const calcContainer = document.getElementById('calcContainer');
const modeIndicator = document.getElementById('modeIndicator');
const logicAction = document.getElementById('logicAction');

let currentMode = 'standard';

// Menu Toggle
document.getElementById('menuToggle').onclick = (e) => {
    e.stopPropagation();
    sideMenu.classList.toggle('active');
};

// Mode Switcher
function switchMode(mode) {
    currentMode = mode;
    calcContainer.className = 'calculator-container mode-' + mode;
    modeIndicator.innerText = mode.toUpperCase();
    sideMenu.classList.remove('active');
    
    if(mode === 'programmer') logicAction.innerText = "CONVERT TO BINARY";
    if(mode === 'currency') logicAction.innerText = "USD TO EUR";
}

// Logic for Special Modes
function runLogic() {
    let val = parseFloat(display.value);
    if (currentMode === 'programmer') {
        display.value = (val >>> 0).toString(2); // Binary conversion
    }
    if (currentMode === 'currency') {
        display.value = (val * 0.92).toFixed(2); // Simple conversion
    }
}

// Standard Button Setup
document.querySelectorAll('.btn').forEach(button => {
    if(!button.onclick && button.innerText.match(/[0-9.]/)) {
        button.onclick = () => appendToDisplay(button.innerText);
    }
});

function appendToDisplay(input) {
    if (display.value === "0") display.value = input;
    else display.value += input;
}

function clearDisplay() { display.value = "0"; }
function deleteLast() { display.value = display.value.slice(0, -1) || "0"; }

function calculate() {
    try { display.value = eval(display.value.replace(/×/g, '*')); } 
    catch { display.value = "Error"; }
}

function mathFunction(type) {
    let val = eval(display.value);
    if (type === 'sin') display.value = Math.sin(val).toFixed(4);
    if (type === 'cos') display.value = Math.cos(val).toFixed(4);
    if (type === 'sqrt') display.value = Math.sqrt(val).toFixed(4);
    if (type === 'log') display.value = Math.log10(val).toFixed(4);
}

document.getElementById('aboutBtn').onclick = () => alert("© 2026 DragonOS Calculator v1.0");
