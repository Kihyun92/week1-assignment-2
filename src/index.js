/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

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

function render(count = [0]) {
  const handleNumber = (currNumber) => {
    if (count.length === 1 && count[0] === 0) {
      render([currNumber]);
    }
    count.splice(0, 1, count[0] * 10 + currNumber);
    render(count);
  };

  const handleOperator = (operator) => {
    console.log('operator::: ', operator);
  };

  const adder = (accumulator, currentValue) => accumulator + currentValue;
  const subtractor = (accumulator, currentValue) => accumulator - currentValue;
  const multiplier = (accumulator, currentValue) => accumulator * currentValue;
  const divider = (accumulator, currentValue) => accumulator / currentValue;

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{count}</p>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((value) => (
        <button type="button" onClick={() => handleNumber(value)}>
          {value}
        </button>
      ))}
      <p>
        {['+', '-', '*', '/', '='].map((operator) => (
          <button type="button" onClick={() => handleOperator(operator)}>
            {operator}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
