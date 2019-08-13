let myArr = [];

function add(num1, num2) {
  let sum = num1 + num2;
  console.log(sum);
}

function subtract(num1, num2) {
  let difference = num1 - num2;
  console.log(difference);
}

function multiply(num1, num2) {
  let product = num1 * num2;
  console.log(product);
}

function divide(num1, num2) {
  let quotient = num1 / num2;
  console.log(quotient);
}

function operate(operator, num1, num2) {
  switch (operator) {
    case "+":
      add(num1, num2);
      break;
    case "-":
      subtract(num1, num2);
      break;
    case "x":
      multiply(num1, num2);
      break;
    case "%":
      divide(num1, num2);
      break;
  }
}

function renderDisplay() {
  let screenSelector = document.getElementById("screen");
  let buttonsDiv = document.getElementById("buttonsDiv");
  let calculatorButtonNames = [
    1,
    2,
    3,
    "%",
    4,
    5,
    6,
    "×",
    7,
    8,
    9,
    "-",
    ".",
    0,
    "=",
    "+",
    "Backspace",
    "AC"
  ];
  calculatorButtonNames.forEach(function(button) {
    let calculatorButton = document.createElement("button");
    buttonsDiv.appendChild(calculatorButton);
    calculatorButton.classList.add("btn");
    calculatorButton.innerText = button;
    calculatorButton.id = calculatorButton.innerText;
  });
  let calculatorButtonSelector = document.querySelectorAll(".btn");
  populateDisplay(calculatorButtonSelector, screenSelector);
}

function populateDisplay(calculatorButtonSelector, screenSelector) {
  console.log(calculatorButtonSelector);
  calculatorButtonSelector.forEach(button => {
    button.addEventListener("click", event => {
      myArr.push(event.target.id);
      screenSelector.innerText += event.target.id;
      calculatorLogic();
    });
  });
}

function calculatorLogic() {
    equalButtonSelector = document.getElementById("=");
    let num1, num2 = undefined;
    console.log(myArr);
    myArr.forEach(function(item) {
        if (item === "+" || item === "-" || item === "×" || item === "÷") {
            const operatorIndex = myArr.indexOf(item);
            num1 = myArr.slice(0, operatorIndex).join('');
            num2 = myArr.slice(operatorIndex + 1, -1).join('');
        }
    });

    equalButtonSelector.addEventListener('click', event => {
        console.log("I'm equal!");
        operate('+', num1, num2);
    })
};

renderDisplay();