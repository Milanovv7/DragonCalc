const display = document.getElementById('display');
const sideMenu = document.getElementById('sideMenu');
const menuToggle = document.getElementById('menuToggle');
const calcContainer = document.getElementById('calcContainer');

// Open/Close Menu
menuToggle.onclick = () => sideMenu.classList.toggle('active');

// MODE SWITCHER ENGINE
function switchMode(mode) {
    // Remove any existing mode classes
    calcContainer.classList.remove('mode-scientific', 'mode-programmer', 'mode-currency');
    
    // If it's scientific, add the class to show the blue buttons
    if (mode === 'scientific') {
        calcContainer.classList.add('mode-scientific');
    } 
    
    // Simple logic for modes not built yet
    if (mode === 'programmer' || mode === 'currency') {
        alert("DragonOS Build Note: " + mode.toUpperCase() + " mode is currently in development.");
    }

    sideMenu.classList.remove('active'); // Close menu
}

// MATH LOGIC
function appendToDisplay(input) {
    if (display.value === "0") display.value = input;
    else display.value += input;
}

function clearDisplay() { display.value = "0"; }
function deleteLast() { display.value = display.value.slice(0, -1) || "0"; }

function calculate() {
    try {
        // Use regex to replace all '×' with '*'
        let expression = display.value.replace(/×/g, '*');
        display.value = eval(expression);
    } catch {
        display.value = "Error";
        setTimeout(clearDisplay, 1500);
    }
}

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

document.getElementById('aboutBtn').onclick = () => alert("© 2026 DragonOS Calculator v1.0");
