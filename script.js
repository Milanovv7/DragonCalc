const display = document.getElementById('display');
const sideMenu = document.getElementById('sideMenu');
const calcContainer = document.getElementById('calcContainer');
const currencyBtn = document.getElementById('currencySelect');

let selectedCurrency = 'MKD';

// Open Menu
document.getElementById('menuToggle').onclick = (e) => {
    e.stopPropagation();
    sideMenu.classList.add('active');
    calcContainer.classList.add('menu-active');
};

// Switch Mode Logic
function switchMode(mode) {
    calcContainer.className = 'calculator-container mode-' + mode;
    closeMenu();
}

function toggleCurrencyMenu() {
    const options = ['MKD', 'USD', 'EUR', 'GBP'];
    let currentIndex = options.indexOf(selectedCurrency);
    selectedCurrency = options[(currentIndex + 1) % options.length];
    currencyBtn.innerText = "TO: " + selectedCurrency;
}

// Global Close Function
function closeMenu() {
    sideMenu.classList.remove('active');
    calcContainer.classList.remove('menu-active');
}

// Close menu when clicking overlay or buttons
document.addEventListener('click', (e) => {
    if (sideMenu.classList.contains('active') && !sideMenu.contains(e.target)) {
        closeMenu();
    }
});

function runLogic() {
    let val = parseFloat(display.value);
    if (calcContainer.classList.contains('mode-programmer')) {
        display.value = (val >>> 0).toString(2);
    }
    if (calcContainer.classList.contains('mode-currency')) {
        const rates = { 'MKD': 56.45, 'USD': 1, 'EUR': 0.92, 'GBP': 0.79 };
        display.value = (val * rates[selectedCurrency]).toFixed(2) + " " + selectedCurrency;
    }
}

function appendToDisplay(input) {
    if (display.value === "0" || isNaN(display.value.charAt(0)) && display.value !== "-") {
        display.value = input;
    } else {
        display.value += input;
    }
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
    closeMenu();
};
