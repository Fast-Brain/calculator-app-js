const isOp = /[\-\+\*\/]/
let numString = ''
let num1; let num2

function add (num1, num2) {
  const sum = num1 + num2
  return Math.round(sum * 100) / 100
}

function subtract (num1, num2) {
  const difference = num1 - num2
  return Math.round(difference * 100) / 100
}

function multiply (num1, num2) {
  const product = num1 * num2
  return Math.round(product * 100) / 100
}

function divide (num1, num2) {
  const quotient = num1 / num2
  return Math.round(quotient * 100) / 100
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
  const calculatorButtonSelector = document.querySelectorAll('.btn')
  calculatorLogic(calculatorButtonSelector, screenSelector)
}

function calculatorLogic (calculatorButtonSelector, screenSelector) {
  let decimalAfterOp = false
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
          if (decimalAfterOp !== true) {
            if (numString.match(isOp)) {
              decimalAfterOp = true
              numString += event.target.id
              screenSelector.innerText += event.target.id
              return
            } else if (!numString.includes(event.target.id)) {
              numString += event.target.id
              screenSelector.innerText += event.target.id
            }
          }
          break
        default:
          screenSelector.innerText += event.target.id
          numString += event.target.id
          break
      }
    })
  })
}

function calculateAnswer (screenSelector) {
  separateNumbersFromOperator()
  const chosenOperator = operatorIdentifier()
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
