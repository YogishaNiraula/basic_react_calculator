import { useReducer } from "react";
import "./App.css";

function NumberButton({ dispatch, className, num }) {
  return (
    <button
      className={className}
      onClick={() => {
        dispatch({ type: "add_num", data: num });
      }}
    >
      {num}
    </button>
  );
}

function OperatorButton({ dispatch, className, operator }) {
  return (
    <button
      className={className}
      onClick={() => {
        dispatch({ type: "operation", data: operator });
      }}
    >
      {operator}
    </button>
  );
}

function calculatorReducer(state, action) {
  switch (action.type) {
    case "reset":
      return {
        currentValue: "0",
        previousValue: null,
        operator: null,
        overwrite: true,
        percent: false,
      };

    case "percent":
      if (state.percent) return state;
      return {
        ...state,
        currentValue: state.currentValue / 100,
        percent: true,
      };

    case "operation":
      if (!state.currentValue && !state.previousValue) return state;
      if (!state.currentValue)
        return {
          ...state,
          operator: action.data,
        };
      return {
        ...state,
        operator: action.data,
        previousValue: state.currentValue,
        currentValue: "",
      };

    case "change_sign":
      return {
        ...state,
        currentValue: state.currentValue
          ? calculateResult({
              operator: "+/-",
              currentValue: state.currentValue,
            })
          : "",
      };

    case "add_num":
      if (state.overwrite)
        return { ...state, currentValue: action.data, overwrite: false };
      if (state.currentValue === "0" && action.data === "0")
        return {
          ...state,
          currentValue: "0",
          overwrite: false,
        };
      if (state.currentValue === "0" && action.data !== "0")
        return { ...state, currentValue: action.data, overwrite: true };
      if (state.currentValue?.includes(".") && action.data === ".")
        return { ...state, decimal: false };
      if (state.decimal)
        return {
          ...state,
          currentValue: state.currentValue + action.data,
        };

      if (action.data === ".")
        return {
          ...state,
          currentValue: state.currentValue ? state.currentValue + "." : "",
          decimal: true,
        };
      return {
        ...state,
        currentValue: state.currentValue
          ? state.currentValue + action.data
          : action.data,
      };

    case "calculate":
      if (!state.currentValue || !state.previousValue || !state.operator)
        return state;
      return {
        ...state,
        previousValue: null,
        operator: null,
        overwrite: true,
        currentValue: calculateResult(state),
      };
    default:
      break;
  }
}

const calculateResult = ({ previousValue, operator, currentValue }) => {
  let previous = parseFloat(previousValue);
  let current = parseFloat(currentValue);
  let result = "";
  switch (operator) {
    case "+":
      result = previous + current;
      break;
    case "-":
      result = previous - current;
      break;
    case "÷":
      result = previous / current;
      break;
    case "X":
      result = previous * current;
      break;
    case "+/-":
      result = -1 * current;
    default:
      break;
  }
  return result.toString();
};

function App() {
  const [state, dispatch] = useReducer(calculatorReducer, {
    currentValue: "0",
    previousValue: null,
    operator: null,
    overwrite: true,
    percent: false,
  });
  return (
    <div className="App">
      <div className="calculator">
        <div className="result">
          <div className="previous-content">
            {state.previousValue}
            {state.operator}
          </div>
          <div className="current-content">{state.currentValue}</div>
        </div>
        <button onClick={() => dispatch({ type: "reset" })}>AC</button>
        <button onClick={() => dispatch({ type: "change_sign" })}>+/-</button>
        <button onClick={() => dispatch({ type: "percent" })}>%</button>
        <OperatorButton
          operator="÷"
          dispatch={dispatch}
          className="col-end-background"
        />
        <NumberButton num="7" dispatch={dispatch} />
        <NumberButton num="8" dispatch={dispatch} />
        <NumberButton num="9" dispatch={dispatch} />
        <OperatorButton
          operator="X"
          dispatch={dispatch}
          className="col-end-background"
        />
        <NumberButton num="4" dispatch={dispatch} />
        <NumberButton num="5" dispatch={dispatch} />
        <NumberButton num="6" dispatch={dispatch} />
        <OperatorButton
          operator="-"
          dispatch={dispatch}
          className="col-end-background"
        />
        <NumberButton num="1" dispatch={dispatch} />
        <NumberButton num="2" dispatch={dispatch} />
        <NumberButton num="3" dispatch={dispatch} />
        <OperatorButton
          operator="+"
          dispatch={dispatch}
          className="col-end-background"
        />
        <NumberButton num="0" dispatch={dispatch} className="col-span-2" />
        <NumberButton num="." dispatch={dispatch} />

        <button
          onClick={() => dispatch({ type: "calculate" })}
          className="col-end-background"
        >
          =
        </button>
      </div>
    </div>
  );
}

export default App;
