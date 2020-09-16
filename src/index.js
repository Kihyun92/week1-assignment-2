/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars, no-use-before-define */

/* @jsx createElement */

function createElement(tagName, props, ...children) {
  const element = document.createElement(tagName);

  Object.entries(props || {}).forEach(([key, value]) => {
    element[key.toLowerCase()] = value;
  });

  children.flat().forEach((child) => {
    if (child instanceof Node) {
      element.appendChild(child);
      return;
    }
    element.appendChild(document.createTextNode(child));
  });

  return element;
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const operators = [
  {
    type: '+', operator: (accumulator, currentValue) => accumulator + currentValue,
  },
  {
    type: '-', operator: (accumulator, currentValue) => accumulator - currentValue,
  },
  {
    type: '*', operator: (accumulator, currentValue) => accumulator * currentValue,
  },
  {
    type: '/', operator: (accumulator, currentValue) => accumulator / currentValue,
  }];

function render(count = 0, operands = [], reducer = undefined) {
  const handleNumber = (selectedNumber) => {
    const { length } = operands;
    // init
    if (length === 0) {
      operands.push(selectedNumber);
      render(selectedNumber, operands);
      return;
    }
    if (!reducer) {
      operands.splice(length - 1, 1, operands[length - 1] * 10 + selectedNumber);
      render(operands[length - 1], operands);
      return;
    }
    if (reducer) {
      if (operands.length === 2) {
        operands.splice(length - 1, 1, operands[length - 1] * 10 + selectedNumber);
        render(operands[length - 1], operands, reducer);
        return;
      }
      operands.push(selectedNumber);
      render(selectedNumber, operands, reducer);
    }
  };

  const handleOperator = (operator) => {
    if (operands.length === 0 && count > 0) {
      operands.push(count);
      render(count, operands, operator);
      return;
    }
    if (operands.length > 1) {
      const sum = operands.reduce(reducer);
      render(sum, [sum], operator);
      return;
    }
    render(count, operands, operator);
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{count}</p>
      {numbers.map((value) => (
        <button type="button" onClick={() => handleNumber(value)}>
          {value}
        </button>
      ))}
      <p>
        {operators.map(({ type, operator }) => (
          <button type="button" onClick={() => handleOperator(operator)}>
            {type}
          </button>
        ))}
        <button type="button" onClick={() => render(operands.reduce(reducer))}>=</button>
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
