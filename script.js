const display = document.getElementById('display');
const sideMenu = document.getElementById('sideMenu');
const calcContainer = document.getElementById('calcContainer');
const logicAction = document.getElementById('logicAction');

document.getElementById('menuToggle').onclick = (e) => {
    e.stopPropagation();
    sideMenu.classList.add('active');
};

function switchMode(mode) {
    calcContainer.className = 'calculator-container mode-' + mode;
    if(mode === 'programmer') logicAction.innerText = "CONVERT TO BINARY";
    if(mode === 'currency') logicAction.innerText = "USD TO MKD";
    sideMenu.classList.remove('active');
}

// Global click listener to close menu if clicking anywhere else
document.addEventListener('click', (e) => {
    if (sideMenu.classList.contains('active') && !sideMenu.contains(e.target)) {
        sideMenu.classList.remove('active');
    }
});

function runLogic() {
    let val = parseFloat(display.value);
    if (calcContainer.classList.contains('mode-programmer')) {
        display.value = (val >>> 0).toString(2);
    }
    if (calcContainer.classList.contains('mode-currency')) {
        display.value = (val * 56.45).toFixed(2) + " MKD";
    }
}

function appendToDisplay(input) {
    if (display.value === "0" || display.value.includes("MKD")) display.value = input;
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
