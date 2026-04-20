const display = document.getElementById('display');
const sideMenu = document.getElementById('sideMenu');
const calcContainer = document.getElementById('calcContainer');
const modeIndicator = document.getElementById('modeIndicator');
const logicAction = document.getElementById('logicAction');

// Menu Toggle
document.getElementById('menuToggle').onclick = (e) => {
    e.stopPropagation();
    sideMenu.classList.toggle('active');
};

// Mode Switcher - Closes menu and swaps UI
function switchMode(mode) {
    calcContainer.className = 'calculator-container mode-' + mode;
    modeIndicator.innerText = (mode === 'standard') ? "DRAGONOS" : mode.toUpperCase();
    
    if(mode === 'programmer') logicAction.innerText = "CONVERT TO BINARY";
    if(mode === 'currency') logicAction.innerText = "USD TO EUR";
    
    sideMenu.classList.remove('active');
}

// Logic for conversions
function runLogic() {
    let val = parseFloat(display.value);
    if (calcContainer.classList.contains('mode-programmer')) display.value = (val >>> 0).toString(2);
    if (calcContainer.classList.contains('mode-currency')) display.value = (val * 0.92).toFixed(2);
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
    try {
        let val = eval(display.value);
        if (type === 'sin') display.value = Math.sin(val).toFixed(4);
        if (type === 'cos') display.value = Math.cos(val).toFixed(4);
        if (type === 'sqrt') display.value = Math.sqrt(val).toFixed(4);
        if (type === 'log') display.value = Math.log10(val).toFixed(4);
    } catch { display.value = "Error"; }
}

document.getElementById('aboutBtn').onclick = () => {
    alert("© 2026 DragonOS Calculator v1.0");
    sideMenu.classList.remove('active');
};
