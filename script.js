const isOp = /[\-\+\*\/]/
let numString = ''
let num1; let num2

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
    case '*':
      return multiply(num1, num2)
    case '/':
      return divide(num1, num2)
  }
}

function renderDisplay () {
  const screenSelector = document.getElementById('screen')
  const opTracker = document.getElementById('opTracker')
  const calculatorButtonSelector = document.querySelectorAll('.btn')
  calculatorLogic(calculatorButtonSelector, screenSelector, opTracker)
}

function calculatorLogic (calculatorButtonSelector, screenSelector, opTracker) {
  calculatorButtonSelector.forEach(button => {
    button.addEventListener('click', event => {
      switch (event.target.id) {
        case 'AC':
          screenSelector.innerText = ' '
          numString = ''
          break
        case 'Backspace':
          numString = numString.substring(0, numString.length - 1)
          screenSelector.innerText = numString
          break
        case '=':
          console.log(event.target.id)
          calculateAnswer(screenSelector)
          break
        case '+':
        case '-':
        case '*':
        case '/':
          calculateAnswer(screenSelector)
          numString += event.target.id
          screenSelector.innerText += event.target.id
          break
        case '.':
          // one decimal on each side of operator
          // if (!numString.includes(event.target.id)) {
          //   numString += event.target.id
          //   screenSelector.innerText += event.target.id
          // }
          numString += event.target.id
          screenSelector.innerText += event.target.id
          break
        default:
          screenSelector.innerText += event.target.id
          numString += event.target.id
          console.log(numString)
          break
      }
    })
  })
}

function calculateAnswer (screenSelector) {
  separateNumbersFromOperator()
  const chosenOperator = operatorIdentifier()
  console.log("chosenOperator is " + chosenOperator)
  console.log("num1 is " + num1 + " and num2 is " + num2)
  if (chosenOperator !== undefined && chosenOperator.length === 1) {
    const answer = operate(chosenOperator, num1, num2)
    screenSelector.innerText = answer
    numString = answer.toString()
  } else if (chosenOperator.length === 2) {
    const answer = operate(chosenOperator[0], num1, num2)
    numString = answer.toString()
    screenSelector.innerText = answer
  }
}

function operatorIdentifier () {
  const chosenOperator = numString.replace(/[0-9\.]/g, '')
  return chosenOperator
}

function separateNumbersFromOperator () {
  const numbers = numString.split(isOp)
  num1 = Number(numbers[0])
  num2 = Number(numbers[1])
  return num1, num2
}

renderDisplay()
