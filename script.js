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
  const opTracker = document.getElementById('opTracker');
  const calculatorButtonSelector = document.querySelectorAll('.btn')
  populateDisplay(calculatorButtonSelector, screenSelector, opTracker)
  calculatorLogic(screenSelector)
}

function populateDisplay (calculatorButtonSelector, screenSelector, opTracker) {
  console.log(calculatorButtonSelector)
  calculatorButtonSelector.forEach(button => {
    button.addEventListener('click', event => {
      switch (event.target.id) {
        case '=':
          myArr.push(event.target.id)
          calculateAnswer(screenSelector)
          break
        case '+':
          myArr.push(event.target.id)
          calculateAnswer(screenSelector)
        case '-':
          myArr.push(event.target.id)
          calculateAnswer(screenSelector)
        default:
          screenSelector.innerText += event.target.id
          myArr.push(event.target.id);
          break
      }
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
  //     console.log(event.target.id);
  //     calculateAnswer(screenSelector);
  // })

  backspaceButtonSelector.addEventListener('click', event => {
    myArr.splice(-1, 1)
    screenSelector.innerText = myArr.join('')
  })

  clearButtonSelector.addEventListener('click', event => {
    screenSelector.innerText = ' '
    myArr = []
  })
}

// calculates for the answer, this is basically the "equals" function
function calculateAnswer (screenSelector) {
  operatorIdentifier()
  console.log("operatorIdentifier is " + operatorIdentifier());
  separateNumbersFromOperator()
  // I think this will always return undefined: console.log("numbers are " + separateNumbersFromOperator())
  const chosenOperator = operatorIdentifier()
  let answer = operate(chosenOperator, num1, num2);
  console.log("answer is " + answer)
  console.log(operatorIdentifier())
  // only clear the array when an answer is generated
  if (answer != 'undefined') {
  screenSelector.innerText = answer;
  myArr = [];
  myArr.push(answer.toString())
  }
  console.log(myArr);
}

// identifies & returns the operator being used
function operatorIdentifier () {
  const operators = /[\+\-\x\/]/
  const chosenOperator = []
  console.log(chosenOperator);
    myArr.forEach(function (item) {
      if (operators.test(item)) {
        chosenOperator.push(item)
      }
    })
    // if someone uses the same operator twice in a row, remove the last operator so there's one
    if (chosenOperator.length == 2 && chosenOperator[0] == chosenOperator[1]) {
      chosenOperator.pop()
      // if someone uses two different operators in the same equation - not sure what to do here
    } else if (chosenOperator.length == 2 && chosenOperator[0] != chosenOperator[1]) {
      console.log("my chosen Operator is " + chosenOperator)
    }
    //console.log('length is' + chosenOperator.length)
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
      return num1, num2, calculatorLogic()
    }
  })
}

renderDisplay()
