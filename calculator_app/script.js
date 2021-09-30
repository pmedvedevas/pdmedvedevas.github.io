//user inputs digits into a string userInput
//lastOperation stores last executed operation

let userInput = "0";
let result = null;
let lastOperation = null;

//user always sees either userInput value or solution result
const displayOutput = document.getElementById('display-output');
displayOutput.innerHTML = userInput;

const sumButton = document.getElementById('sum');
const subtractButton = document.getElementById('subtract');
const equalityButton = document.getElementById('equal');
const multiplyButton = document.getElementById('multiply');
const divideButton = document.getElementById('divide');


//rounding function ensures that numbers yielded are not getting out of display box
const rounding = (num) => {
    let trunc = num.toString().length - Math.floor(num).toString().length;
    num = num.toFixed(trunc - (num.toString().length - 9));
    return num;
}


//onclick digits are concatenated into userInput that is being displayed
//max input length 8 digits

const setDigit = clicked_id => {
    if (userInput === "0" && clicked_id != ".") {
        userInput = "";
    }
    if(userInput.length <= 8) {
        userInput += clicked_id;
        displayOutput.innerHTML = userInput;
    }
}


//  OPERATIONS
sumButton.onclick = function () {
    sum();
}

subtractButton.onclick = function () {
    subtract();
}

multiplyButton.onclick = function () {
    multiply();
}

divideButton.onclick = function () {
    divide();
}

//first condition enables stores user input in result variable
//second and third conditions execute operation that was last clicked, so we don't skip any operations
//if result contains more than 8 digits it is rounded with rounding function

const sum = () => {
    if(result === null) {
        result = parseFloat(userInput);
        userInput = "";
        lastOperation = 'sum';
    }
    if(userInput !== "" && result !== null && lastOperation == 'sum') {
        result = parseFloat(userInput) + result;
        if (result.toString().length < 8) {
            displayOutput.innerHTML = result;
        } else {
            displayOutput.innerHTML = rounding(result);
        }
        userInput = "";
        lastOperation = 'sum'
    }
    else if (lastOperation != 'sum') {
        resolve();
        lastOperation = 'sum'
    }

}

const subtract = () => {
    if(result === null) {
        result = parseFloat(userInput);
        userInput = "";
        lastOperation = 'subtract'
    }
    if(userInput !== "" && result !== null  && lastOperation == 'subtract') {
        result = result - parseFloat(userInput);
        if (result.toString().length < 8) {
            displayOutput.innerHTML = result;
        } else {
            displayOutput.innerHTML = rounding(result);
        }
        userInput = "";
        lastOperation = 'subtract';
    }
    else if (lastOperation != 'subtract') {
        resolve();
        lastOperation = 'subtract';
    }
}

const multiply = () => {
    if(result === null) {
        result = parseFloat(userInput);
        userInput = "";
        lastOperation = 'multiply'
    }
    if(userInput !== "" && result !== null  && lastOperation == 'multiply') {
        result = result * parseFloat(userInput);
        if (result.toString().length < 8) {
            displayOutput.innerHTML = result;
        } else {
            displayOutput.innerHTML = rounding(result);
        }
        userInput = "";
        lastOperation = 'multiply';
    }
    else if (lastOperation != 'multiply') {
        resolve();
        lastOperation = 'multiply';
    }
}

const divide = () => {
    if(result === null) {
        result = parseFloat(userInput);
        userInput = "";
        lastOperation = 'divide'
    }
    if(userInput !== "" && result !== null  && lastOperation == 'divide') {
        result = result / parseFloat(userInput);
        if (result.toString().length < 8) {
            displayOutput.innerHTML = result;
        } else {
            displayOutput.innerHTML = rounding(result);
        }
        userInput = "";
        lastOperation = 'divide';
    }
    else if (lastOperation != 'divide') {
        resolve();
        lastOperation = 'divide';
    }
}


//'equal' button always resolves lastoperation selected

equalityButton.onclick = function() {
    resolve();
};

const resolve = () => {
    if(userInput !== "" && result !== null) {
        switch(lastOperation) {
            case 'sum':
                sum();
                break;
            case 'subtract':
                subtract();
                break;
            case 'multiply':
                multiply();
                break;
            case 'divide':
                divide();
                break;
        }
    }
}

//'C' button resets all app parameters
const cleanDisplay = () => {
    result = null;
    userInput = "0";
    lastOperation = null;
    displayOutput.innerHTML = userInput;
}

//backspace allows user to correct input in case of mistype and such
const backspace = () => {
    if(displayOutput.innerHTML == result) {
        result = result.toString().slice(0, -1);
        displayOutput.innerHTML = result;
    }
    else if(displayOutput.innerHTML == userInput) {
        userInput = userInput.slice(0, -1);
        displayOutput.innerHTML = userInput;
    }
}

//inverse function returns opposite number to the display
const inverse = () => {
    if(displayOutput.innerHTML == result) {
        result = result * (-1);
        displayOutput.innerHTML = result;
    }
    else if(displayOutput.innerHTML == userInput) {
        userInput = (parseFloat(userInput) * (-1)).toString();
        displayOutput.innerHTML = userInput;
    }
}


 




