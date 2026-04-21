const display = document.getElementById('display');
const sideMenu = document.getElementById('sideMenu');
const calcContainer = document.getElementById('calcContainer');
const currencyBtn = document.getElementById('currencySelect');

let selectedCurrency = 'MKD';

// 1. OPEN MENU
document.getElementById('menuToggle').onclick = (e) => {
    e.stopPropagation();
    sideMenu.classList.add('active');
    calcContainer.classList.add('menu-active'); // This hides the ☰ icon
};

// 2. CLOSE MENU FUNCTION
function closeMenu() {
    sideMenu.classList.remove('active');
    calcContainer.classList.remove('menu-active'); // This shows the ☰ icon again
}

// 3. SWITCH MODES
function switchMode(mode) {
    // We preserve the mode class but remove the menu-active class
    calcContainer.className = 'calculator-container mode-' + mode;
    closeMenu();
}

// 4. CLICK OUTSIDE TO CLOSE
document.addEventListener('click', (e) => {
    if (sideMenu.classList.contains('active') && !sideMenu.contains(e.target)) {
        closeMenu();
    }
});

// 5. CURRENCY SELECTION LOGIC
function toggleCurrencyMenu() {
    const options = ['MKD', 'USD', 'EUR', 'GBP'];
    let currentIndex = options.indexOf(selectedCurrency);
    selectedCurrency = options[(currentIndex + 1) % options.length];
    currencyBtn.innerText = "TO: " + selectedCurrency;
}

// 6. CONVERSION LOGIC
function runLogic() {
    let val = parseFloat(display.value);
    if (isNaN(val)) return;

    if (calcContainer.classList.contains('mode-programmer')) {
        display.value = (val >>> 0).toString(2);
    }
    if (calcContainer.classList.contains('mode-currency')) {
        const rates = { 'MKD': 56.45, 'USD': 1, 'EUR': 0.92, 'GBP': 0.79 };
        display.value = (val * rates[selectedCurrency]).toFixed(2) + " " + selectedCurrency;
    }
}

// 7. BASIC CALCULATOR FUNCTIONS
function appendToDisplay(input) {
    // If display is 0 or shows a currency result, replace it with the new number
    if (display.value === "0" || isNaN(display.value.charAt(0)) && display.value !== "-") {
        display.value = input;
    } else {
        display.value += input;
    }
}

function clearDisplay() { display.value = "0"; }
function deleteLast() { display.value = display.value.slice(0, -1) || "0"; }

function calculate() {
    try { 
        display.value = eval(display.value.replace(/×/g, '*')); 
    } catch { 
        display.value = "Error"; 
    }
}

// 8. SCIENTIFISTIC FUNCTIONS
function mathFunction(type) {
    try {
        let val = eval(display.value);
        if (type === 'sin') display.value = Math.sin(val).toFixed(4);
        if (type === 'cos') display.value = Math.cos(val).toFixed(4);
        if (type === 'sqrt') display.value = Math.sqrt(val).toFixed(4);
        if (type === 'log') display.value = Math.log10(val).toFixed(4);
    } catch { 
        display.value = "Error"; 
    }
}

// 9. ABOUT BUTTON
document.getElementById('aboutBtn').onclick = () => {
    alert("DragonCalc v1.0\nBuilt for DragonOS 2026");
    closeMenu();
};
