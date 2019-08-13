function add (num1, num2) {
    let sum = num1 + num2;
    console.log(sum)
}

function subtract (num1, num2) {
    let difference = num1 - num2;
    console.log(difference)
}

function multiply (num1, num2) {
    let product = num1 * num2;
    console.log(product)
}

function divide (num1, num2) {
    let quotient = num1 / num2;
    console.log(quotient)
}

function operate(operator, num1, num2) {
    switch(operator) {
        case '+':
            add(num1, num2);
            break;
        case '-':
            subtract(num1, num2);
            break;
        case 'x':
            multiply(num1, num2);
            break;
        case '%':
            divide(num1, num2)
            break;
    }
}

function renderButtons() {
    let calculatorDiv = document.getElementById('calculator');
    let calculatorButtonNames = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
    // x = 0;
    // while (x <= 9) {
        calculatorButtonNames.forEach(function(button) {
            let calculatorButton = document.createElement('button');
            calculatorDiv.appendChild(calculatorButton);
            calculatorButton.innerText = button;
        })
    }
// }

renderButtons();

console.log(operate('%', 5, 2));