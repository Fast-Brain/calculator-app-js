let myArr = []
let num1 = undefined
let num2 = undefined

function add (num1, num2) {
  const sum = num1 + num2
  return sum
}

function subtract (num1, num2) {
  const difference = num1 - num2
  return difference
}

function multiply (num1, num2) {
  const product = num1 * num2
  return product
}

function divide (num1, num2) {
  const quotient = num1 / num2
  return quotient
}

function operate (operator, num1, num2) {
  switch (operator) {
    case '+':
      return add(num1, num2)
    case '-':
      return subtract(num1, num2)
    case 'x':
      return multiply(num1, num2)
    case '/':
      return divide(num1, num2)
  }
}

function renderDisplay () {
  const screenSelector = document.getElementById('screen')
  const buttonsDiv = document.getElementById('buttonsDiv')
  const calculatorButtonNames = [
    1,
    2,
    3,
    '/',
    4,
    5,
    6,
    'x',
    7,
    8,
    9,
    '-',
    '.',
    0,
    '=',
    '+',
    'Backspace',
    'AC'
  ]

  calculatorButtonNames.forEach(function (button) {
    const calculatorButton = document.createElement('button')
    buttonsDiv.appendChild(calculatorButton)
    calculatorButton.classList.add('btn')
    calculatorButton.innerText = button
    // this gives the operators a shared 'operator' class
    if (button === '+' || button === '-' || button === 'x' || button === '/') {
      calculatorButton.classList.add('operator')
    }
    calculatorButton.id = 'operator'
    calculatorButton.id = calculatorButton.innerText
  })
  const calculatorButtonSelector = document.querySelectorAll('.btn')
  populateDisplay(calculatorButtonSelector, screenSelector)
  calculatorLogic(screenSelector)
}

function populateDisplay (calculatorButtonSelector, screenSelector) {
  console.log(calculatorButtonSelector)
  calculatorButtonSelector.forEach(button => {
    button.addEventListener('click', event => {
      if (event.target.id !== 'Backspace') {
        myArr.push(event.target.id)
      }
      screenSelector.innerText += event.target.id
      console.log(myArr)
    })
  })
}

function calculatorLogic (screenSelector) {
  const equalButtonSelector = document.getElementById('=')
  const clearButtonSelector = document.getElementById('AC')
  const backspaceButtonSelector = document.getElementById('Backspace')
  const plusButtonSelector = document.getElementById('+');
  let clicked = "false";
  console.log(myArr);


  // next: allow the plus button to "chain" answers

  // plusButtonSelector.addEventListener('click', event => {
  //   if (clicked === true) {
  //     calculateAnswer(screenSelector);
  //   }
  //   clicked = true;
  // })

  backspaceButtonSelector.addEventListener('click', event => {
    myArr.splice(-1, 1)
    screenSelector.innerText = myArr.join('')
  })

  clearButtonSelector.addEventListener('click', event => {
    screenSelector.innerText = ' '
    myArr = []
  })

  equalButtonSelector.addEventListener('click', event => {
    calculateAnswer(screenSelector)
  })
}

// calculates for the answer, this is basically the "equals" function
function calculateAnswer (screenSelector) {
  operatorIdentifier()
  console.log("operatorIdentifier is " + operatorIdentifier());
  separateNumbersFromOperator()
  console.log("numbers are + " + separateNumbersFromOperator())
  const chosenOperator = operatorIdentifier()
  let answer = operate(chosenOperator, num1, num2);
  console.log("answer is " + answer)
  console.log(operatorIdentifier())
  // only clear the array when an answer is generated
  if (answer != 'undefined') {
  screenSelector.innerText = answer;
  myArr = [];
  }
  console.log(myArr);
  myArr.push(answer.toString())
}

// identifies & returns the operator being used
function operatorIdentifier () {
  const operators = /[\+\-\x\/]/
  const chosenOperator = []
    myArr.forEach(function (item) {
      if (operators.test(item)) {
        chosenOperator.push(item)
      }
    })
    return chosenOperator.join()
}

// separates the numbers on each side of the equation
function separateNumbersFromOperator () {
  myArr.forEach(function (item) {
    if (item === '+' || item === '-' || item === 'x' || item === '÷') {
      const operatorIndex = myArr.indexOf(item)
      num1 = Number(myArr.slice(0, operatorIndex).join(''))
      num2 = Number(myArr.slice(operatorIndex + 1, -1).join(''))
      console.log(num1, num2);
      calculatorLogic()
    }
  })
}

renderDisplay()
