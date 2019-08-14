let myArr = [];
let num1 = undefined;
let num2 = undefined;

function add(num1, num2) {
  let sum = num1 + num2;
  return sum;
}

function subtract(num1, num2) {
  let difference = num1 - num2;
  return difference;
}

function multiply(num1, num2) {
  let product = num1 * num2;
  return product;
}

function divide(num1, num2) {
  let quotient = num1 / num2;
  return quotient;
}

function operate(operator, num1, num2) {
  switch (operator) {
    case "+":
      return add(num1, num2);
      break;
    case "-":
      return subtract(num1, num2);
      break;
    case "x":
      return multiply(num1, num2);
      break;
    case "/":
      return divide(num1, num2);
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
    "/",
    4,
    5,
    6,
    "x",
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
    // this gives the operators a shared 'operator' class
    if (button === '+' || button === '-' || button === 'x' || button === '/') {
        calculatorButton.classList.add("operator");
    }
    calculatorButton.id = "operator";
    calculatorButton.id = calculatorButton.innerText;
  });
  let calculatorButtonSelector = document.querySelectorAll(".btn");
  populateDisplay(calculatorButtonSelector, screenSelector);
  calculatorLogic(screenSelector);
}

function populateDisplay(calculatorButtonSelector, screenSelector) {
  console.log(calculatorButtonSelector);
  calculatorButtonSelector.forEach(button => {
    button.addEventListener("click", event => {
    // pushes content to array
      myArr.push(event.target.id);
    // changes screen text to numbers that are pressed
      screenSelector.innerText += event.target.id;
      console.log(myArr);
      // this runs with every button press
    });
  });
}

function calculatorLogic(screenSelector) {
  let equalButtonSelector = document.getElementById("=");
  let additionButtonSelector = document.getElementById("+");
  let clearButtonSelector = document.getElementById('AC');

    clearButtonSelector.addEventListener('click', event => {
        screenSelector.innerText = "";
        myArr = [];
    })

    // fires every time the [=] button is clicked
    equalButtonSelector.addEventListener('click', event => {
      let operators = /[\+\-\x\/]/;
      let chosenOperator = [];
        let operatorIdentifier = myArr.forEach(function(item) {
          if (operators.test(item)) {
            chosenOperator.push(item);
          }
        });
        separateNumbersFromOperator();
        chosenOperatorString = chosenOperator.join('');
        screenSelector.innerText = operate(chosenOperatorString, num1, num2);
        // console.log(operate('+', num1, num2))
    })

    // additionButtonSelector.addEventListener('click', event => {
    //     separateNumbersFromOperator();
    //     console.log(screenSelector);
    //     screenSelector.innerText = operate('+', num1, num2);
    //     console.log(operate('+', num1, num2));
    // })
};

function separateNumbersFromOperator() {


    myArr.forEach(function(item) {
        if (item === "+" || item === "-" || item === "x" || item === "÷") {
            const operatorIndex = myArr.indexOf(item);
            num1 = Number(myArr.slice(0, operatorIndex).join(''));
            num2 = Number(myArr.slice(operatorIndex + 1, -1).join(''));
            calculatorLogic();
        }
    });
}

renderDisplay();