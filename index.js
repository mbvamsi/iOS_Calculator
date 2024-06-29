// DOM Elements
const timestampElement = document.getElementById("timestamp");
const displayElement = document.querySelector(".display");

const clearButton = document.getElementById("clear");
const plusMinusButton = document.getElementById("plus-minus");
const percentButton = document.getElementById("percent");

const addButton = document.getElementById("add");
const subtractButton = document.getElementById("subtract");
const multiplyButton = document.getElementById("multiply");
const divideButton = document.getElementById("divide");
const equalsButton = document.getElementById("equals");

const decimalButton = document.getElementById("decimal");
const numberButtons = Array.from(document.querySelectorAll(".number"));

// Variables
let firstOperand = "";
let secondOperand = "";
let currentOperator = null;
let shouldResetDisplay = false;

// Functions

// Reset the display for a new input
const resetDisplay = () => {
  displayElement.textContent = "0";
  shouldResetDisplay = false;
};

// Clear all values and reset the display
const clear = () => {
  displayElement.textContent = "0";
  firstOperand = "";
  secondOperand = "";
  currentOperator = null;
};

// Append a number to the display
const appendNumber = (number) => {
  if (displayElement.textContent === "0" || shouldResetDisplay) {
    displayElement.textContent = number;
    shouldResetDisplay = false;
  } else {
    displayElement.textContent += number;
  }
};

// Set the operator for the calculation
const setOperator = (operator) => {
  if (currentOperator !== null) evaluate();
  firstOperand = displayElement.textContent;
  currentOperator = operator;
  shouldResetDisplay = true;
};

// Evaluate the current operation
const evaluate = () => {
  if (currentOperator === null || shouldResetDisplay) return;
  if (currentOperator === "÷" && displayElement.textContent === "0") {
    alert("You can't divide by 0!");
    return;
  }
  secondOperand = displayElement.textContent;
  displayElement.textContent = roundResult(
    operate(currentOperator, firstOperand, secondOperand)
  );
  currentOperator = null;
};

// Round the result to avoid floating point issues
const roundResult = (number) => Math.round(number * 1000) / 1000;

// Perform the operation based on the operator
const operate = (operator, a, b) => {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (operator) {
    case "+":
      return a + b;
    case "−":
      return a - b;
    case "×":
      return a * b;
    case "÷":
      return a / b;
    default:
      return null;
  }
};

// Handle number button clicks
const handleNumberClick = (e) => appendNumber(e.target.textContent);

// Handle operator button clicks
const handleOperatorClick = (e) => setOperator(e.target.textContent);

// Handle equals button click
const handleEqualsClick = () => evaluate();

// Handle clear button click
const handleClearClick = () => clear();

// Handle plus/minus button click
const handlePlusMinusClick = () =>
  (displayElement.textContent = displayElement.textContent * -1);

// Handle percent button click
const handlePercentClick = () =>
  (displayElement.textContent = displayElement.textContent / 100);

// Handle decimal button click
const handleDecimalClick = () => {
  if (shouldResetDisplay) resetDisplay();
  if (!displayElement.textContent.includes("."))
    displayElement.textContent += ".";
};

// Event Listeners
numberButtons.forEach((button) =>
  button.addEventListener("click", handleNumberClick)
);
addButton.addEventListener("click", handleOperatorClick);
subtractButton.addEventListener("click", handleOperatorClick);
multiplyButton.addEventListener("click", handleOperatorClick);
divideButton.addEventListener("click", handleOperatorClick);
equalsButton.addEventListener("click", handleEqualsClick);
clearButton.addEventListener("click", handleClearClick);
plusMinusButton.addEventListener("click", handlePlusMinusClick);
percentButton.addEventListener("click", handlePercentClick);
decimalButton.addEventListener("click", handleDecimalClick);

// Update the timestamp
const updateTimestamp = () => {
  const now = new Date();
  const options = {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZoneName: "short",
  };
  const formattedTime = now
    .toLocaleDateString("en-US", options)
    .replace(",", "");
  timestampElement.textContent = formattedTime;
};

// Update the timestamp every second
setInterval(updateTimestamp, 1000);
updateTimestamp();
