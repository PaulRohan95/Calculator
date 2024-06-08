import React, { useState } from 'react';
import styles from './App.module.css';

function evaluateExpression(expression) {
  const operators = ['+', '-', '*', '/'];
  let tokens = expression.split(' ');
  

  for (let i = 0; i < tokens.length - 1; i++) {
    if (operators.includes(tokens[i]) && operators.includes(tokens[i + 1])) {
      tokens[i] += tokens[i + 1];
      tokens.splice(i + 1, 1);
    }
  }

  let result = parseFloat(tokens[0]);
  for (let i = 1; i < tokens.length; i += 2) {
    const operator = tokens[i];
    const operand = parseFloat(tokens[i + 1]);

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
  const [input, setInput] = useState('');
  const [calculationHistory, setCalculationHistory] = useState('');
  const [result, setResult] = useState('');
  const [isNewOperation, setIsNewOperation] = useState(true);

  const handleNumberClick = (value) => {
    setInput(input + value);
    setIsNewOperation(false);
  }

  const handleOperatorClick = (op) => {
    if (input === '' && result !== '') {
      setInput(result + ' ' + op + ' ');
    } else {
      setInput(input + ' ' + op + ' ');
    }
    setIsNewOperation(false);
  }

  const handleClear = () => {
    setInput('');
    setResult('');
    setCalculationHistory('');
    setIsNewOperation(true);
  }

  const handleEquals = () => {
    if (input.trim() === '') {
      setResult('Error');
    } else {
      const operators = ['+', '-', '*', '/'];
      let expression = calculationHistory + input;
      if (result !== '') {
        expression = result + ' ' + input;
      }
      const tokens = expression.trim().split(' ');
      if (operators.includes(tokens[tokens.length - 1])) {
        setResult('Error');
      } else {
        const currentResult = evaluateExpression(expression);
        setCalculationHistory(expression + ' = ' + currentResult + ' ');
        setResult(currentResult);
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
