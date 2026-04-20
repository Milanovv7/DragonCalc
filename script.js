const display = document.getElementById('display');
const sideMenu = document.getElementById('sideMenu');
const calcContainer = document.getElementById('calcContainer');
const modeIndicator = document.getElementById('modeIndicator');
const logicAction = document.getElementById('logicAction');

let currentMode = 'standard';

document.getElementById('menuToggle').onclick = (e) => {
    e.stopPropagation();
    sideMenu.classList.toggle('active');
};

function switchMode(mode) {
    currentMode = mode;
    // Clean up container classes
    calcContainer.className = 'calculator-container mode-' + mode;
    
    // Update labels
    if (mode === 'standard') {
        modeIndicator.innerText = "";
    } else {
        modeIndicator.innerText = mode.toUpperCase();
    }
    
    if(mode === 'programmer') logicAction.innerText = "CONVERT TO BINARY";
    if(mode === 'currency') logicAction.innerText = "USD TO EUR";
    
    sideMenu.classList.remove('active');
}

function runLogic() {
    let val = parseFloat(display.value);
    if (currentMode === 'programmer') display.value = (val >>> 0).toString(2);
    if (currentMode === 'currency') display.value = (val * 0.92).toFixed(2);
}

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
