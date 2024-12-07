import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [inputNumber, setInputNumber] = useState(0);
  const [calculatedNum, setCalculatedNum] = useState(0);
  const [isDecimal, setIsDecimal] = useState(false);
  const [decimalCount, setDecimalCount] = useState(1);
  const [operator, setOperator] = useState("");
  const [monitor, setMonitor] = useState("");

  useEffect(() => {
    setMonitor(inputNumber);
  }, [inputNumber]);

  useEffect(() => {
    setMonitor(calculatedNum);
  }, [calculatedNum]);

  const TakeInputNum = (num) => {
    if (isDecimal) {
      num = num / Math.pow(10, decimalCount);
      setDecimalCount(decimalCount + 1);
      setInputNumber(parseFloat((inputNumber + num).toFixed(decimalCount)));
    } else {
      setInputNumber(inputNumber * 10 + num);
    }
  };

  const TakeOperator = (operator) => {
    setOperator(operator);
    calculate();
    setInputNumber(0);
  };

  const calculate = () => {
    setIsDecimal(false);
    setDecimalCount(1);

    if (operator === '/' && inputNumber === 0) {
      setMonitor("Error");
      setCalculatedNum(0);
      return;
    }
    if (calculatedNum === 0 && inputNumber === 0) {
      return;
    }

    switch (operator) {
      case "+":
        setCalculatedNum(calculatedNum + inputNumber);
        break;
      case "-":
        setCalculatedNum(calculatedNum - inputNumber);
        break;
      case "*":
        setCalculatedNum(calculatedNum * inputNumber);
        break;
      case "/":
        setCalculatedNum(calculatedNum / inputNumber);
        break;
      case "%":
        setCalculatedNum(calculatedNum % inputNumber);
        break;
      case "^":
        setCalculatedNum(Math.pow(calculatedNum, inputNumber));
        break;
      default:
        setCalculatedNum(inputNumber);
    }
    setInputNumber(0);
  };

  const clearAll = () => {
    setInputNumber(0);
    setCalculatedNum(0);
    setOperator("");
    setMonitor(0);
    setIsDecimal(false);
    setDecimalCount(1);
  };

  const GetEquation = () => {
    calculate();
    setOperator("");
  };

  return (
    <>
      <div className="calculator">
        <section className="monitor">
          <p className="out-put">{monitor}</p>
        </section>
        <section className="keyboard">
          <div className="keyboard-row">
            <button onClick={clearAll} className="one-block blue">AC</button>
            <button onClick={() => TakeOperator("%")} className="one-block blue">%</button>
            <button onClick={() => TakeOperator("^")} className="one-block blue">^</button>
            <button onClick={() => TakeOperator("/")} className="one-block blue">/</button>
          </div>
          <div className="keyboard-row">
            <button onClick={() => TakeInputNum(7)} className="one-block">7</button>
            <button onClick={() => TakeInputNum(8)} className="one-block">8</button>
            <button onClick={() => TakeInputNum(9)} className="one-block">9</button>
            <button onClick={() => TakeOperator("*")} className="one-block red">*</button>
          </div>
          <div className="keyboard-row">
            <button onClick={() => TakeInputNum(4)} className="one-block">4</button>
            <button onClick={() => TakeInputNum(5)} className="one-block">5</button>
            <button onClick={() => TakeInputNum(6)} className="one-block">6</button>
            <button onClick={() => TakeOperator("-")} className="one-block red">-</button>
          </div>
          <div className="keyboard-row">
            <button onClick={() => TakeInputNum(1)} className="one-block">1</button>
            <button onClick={() => TakeInputNum(2)} className="one-block">2</button>
            <button onClick={() => TakeInputNum(3)} className="one-block">3</button>
            <button onClick={() => TakeOperator("+")} className="one-block red">+</button>
          </div>
          <div className="keyboard-row">
          <button onClick={() => TakeInputNum(0)} className="one-block">0</button>
            <button onClick={() => TakeInputNum(0)} className="one-block">0</button>
            <button onClick={() => setIsDecimal(true)} className="one-block">.</button>
            <button onClick={() => GetEquation()} className="one-block red">=</button>
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
