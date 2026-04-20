const display = document.getElementById('display');
const sideMenu = document.getElementById('sideMenu');
const menuToggle = document.getElementById('menuToggle');
const aboutBtn = document.getElementById('aboutBtn');

// Toggle Menu Logic
menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    sideMenu.classList.toggle('active');
});

// Close menu when clicking anywhere else
document.addEventListener('click', (e) => {
    if (!sideMenu.contains(e.target) && sideMenu.classList.contains('active')) {
        sideMenu.classList.remove('active');
    }
});

// Calculator Functions
function appendToDisplay(input) {
    if (display.value === "0" && input !== ".") {
        display.value = input;
    } else {
        display.value += input;
    }
}

function clearDisplay() {
    display.value = "0";
}

function deleteLast() {
    if (display.value.length === 1) {
        display.value = "0";
    } else {
        display.value = display.value.slice(0, -1);
    }
}

function calculate() {
    try {
        // We replace the visible '×' with '*' for math logic
        let result = eval(display.value.replace(/×/g, '*'));
        
        // Handle long decimals
        if (result.toString().includes('.')) {
            result = parseFloat(result.toFixed(8));
        }
        
        display.value = result;
    } catch (error) {
        display.value = "Error";
        setTimeout(clearDisplay, 1500);
    }
}

// About Section
aboutBtn.addEventListener('click', () => {
    alert("© 2026 DragonOS Calculator v1.0");
});