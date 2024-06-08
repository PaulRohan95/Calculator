import React, { useState } from 'react';
import styles from './App.module.css';

// Function to evaluate the expression
function evaluateExpression(expression) {
  const operators = ['+', '-', '*', '/'];
  let exp = [];
  let numChar = [];

  // Iterate over each character in the expression
  for (let char of expression) {
    // If the character is an operator, push the accumulated number and the operator to exp
    if (operators.includes(char)) {
      if (numChar.length > 0) {
        exp.push(numChar.join(''));
        numChar = [];
      }
      exp.push(char);
    } else {
      // If the character is part of a number, add it to the numChar
      numChar.push(char);
    }
  }
  
  // Push the last accumulated number to exp
  if (numChar.length > 0) {
    exp.push(numChar.join(''));
  }

  // Initialize result with the first number
  let result = parseFloat(exp[0]);
  // Iterate over the exp and apply operations
  for (let i = 1; i < exp.length; i += 2) {
    const operator = exp[i];
    const operand = parseFloat(exp[i + 1]);

    // Perform the operation based on the operator
    switch (operator) {
      case '+':
        result += operand;
        break;
      case '-':
        result -= operand;
        break;
      case '*':
        result *= operand;
        break;
      case '/':
        result /= operand;
        break;
      default:
        break;
    }
  }

  return result;
}

function App() {
  const [input, setInput] = useState(''); // State to keep track of the current input
  const [calculationHistory, setCalculationHistory] = useState(''); // State to keep track of the calculation history
  const [result, setResult] = useState(''); // State to keep track of the result
  const [isNewOperation, setIsNewOperation] = useState(true); // State to track if a new operation has started

  // Handle number button click
  const handleNumberClick = (value) => {
    // If a new operation has started, reset the input
    if (isNewOperation) {
      setInput(value);
      setIsNewOperation(false);
    } else {
      // Otherwise, append the number to the existing input
      setInput(input + value);
    }
  }

  // Handle operator button click
  const handleOperatorClick = (op) => {
    // If a new operation and there is a result, start new input with the result and operator
    if (isNewOperation && result !== '') {
      setInput(result + op);
    } else {
      // Otherwise, append the operator to the existing input
      setInput(input + op);
    }
    setIsNewOperation(false);
  }

  // Handle clear button click
  const handleClear = () => {
    // Reset all states to their initial values
    setInput('');
    setResult('');
    setCalculationHistory('');
    setIsNewOperation(true);
  }

  // Handle equals button click
  const handleEquals = () => {
    // Check if the input is empty
    if (input.trim() === '') {
      setResult('Error');
    } else {
      const operators = ['+', '-', '*', '/'];
      let expression = calculationHistory + input;
      if (result !== '') {
        expression = result + input;
      }
      const lastChar = expression[expression.length - 1];
      // Check if the last character is an operator
      if (operators.includes(lastChar)) {
        setResult('Error');
      } else {
        // Evaluate the expression and update the history and result
        const currentResult = evaluateExpression(expression);
        setCalculationHistory(expression + '=' + currentResult);
        setResult(currentResult);
        setInput(currentResult.toString());
      }
      setIsNewOperation(true);
    }
  };

  return (
    <div>
      <h1>React Calculator</h1>
      <form>
        <label className={styles.inputText}>
          <input type="text" value={input} readOnly />
        </label>
      </form>
      <div className={styles.result}>
        <h3>{result}</h3>
      </div>
      <div className={styles.inputWrapper}>
        <div>
          <button onClick={() => handleNumberClick('7')}>7</button>
          <button onClick={() => handleNumberClick('8')}>8</button>
          <button onClick={() => handleNumberClick('9')}>9</button>
          <button onClick={() => handleOperatorClick('+')}>+</button>
        </div>
        <div>
          <button onClick={() => handleNumberClick('4')}>4</button>
          <button onClick={() => handleNumberClick('5')}>5</button>
          <button onClick={() => handleNumberClick('6')}>6</button>
          <button onClick={() => handleOperatorClick('-')}>-</button>
        </div>
        <div>
          <button onClick={() => handleNumberClick('1')}>1</button>
          <button onClick={() => handleNumberClick('2')}>2</button>
          <button onClick={() => handleNumberClick('3')}>3</button>
          <button onClick={() => handleOperatorClick('*')}>*</button>
        </div>
        <div>
          <button onClick={handleClear}>C</button>
          <button onClick={() => handleNumberClick('0')}>0</button>
          <button onClick={handleEquals}>=</button>
          <button onClick={() => handleOperatorClick('/')}>/</button>
        </div>
      </div>
    </div>
  );
}

export default App;
