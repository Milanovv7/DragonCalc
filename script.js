const display = document.getElementById('display');
const sideMenu = document.getElementById('sideMenu');
const menuToggle = document.getElementById('menuToggle');
const aboutBtn = document.getElementById('aboutBtn');

// Toggle Menu Logic
menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    sideMenu.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (!sideMenu.contains(e.target) && sideMenu.classList.contains('active')) {
        sideMenu.classList.remove('active');
    }
});

// NEW: Mode Switching Logic
const menuItems = document.querySelectorAll('.menu-item');
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        const mode = item.innerText;
        alert("DragonOS " + mode + " Mode: This feature is being calibrated for the next build.");
        sideMenu.classList.remove('active'); // Close menu after clicking
    });
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
        let result = eval(display.value.replace(/×/g, '*'));
        if (result.toString().includes('.')) {
            result = parseFloat(result.toFixed(8));
        }
        display.value = result;
    } catch (error) {
        display.value = "Error";
        setTimeout(clearDisplay, 1500);
    }
}

aboutBtn.addEventListener('click', () => {
    alert("© 2026 DragonOS Calculator v1.0");
});
