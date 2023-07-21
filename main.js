let firstNumber;
let secondNumber;
let operator;
let operatorSign;
const numbers = document.querySelectorAll('.number');
const result = document.querySelector('.result');
const equal = document.querySelector('.equal');
const operators = document.querySelectorAll('.operator');


const add = (a, b)=>{
    return a+b;
};
const subtract = (a, b)=>{
    return a-b;
};
const multiply = (a, b)=>{
    return a*b;
};
const divide = (a, b)=>{
    return a/b;
};

function operate(nbr1, nbr2, operator){
    switch (operator){
        case '+':
            const plus = add(nbr1, nbr2);
            return plus;
            break;
        case '-':
            const minus = subtract(nbr1, nbr2);
            return minus;
            break;
        case 'x':
            const times = multiply(nbr1, nbr2);
            return times;
            break;
        default:
            const divides = divide(nbr1, nbr2);
            return divides;
            break;
    }
        
}

numbers.forEach(nbr => {
    nbr.addEventListener('click',e=>{
        result.textContent += e.target.textContent;
    })
});

operators.forEach(sign => {
    sign.addEventListener('click', sign=>{
        firstNumber = result.textContent;
        operatorSign = sign.target.textContent;
        result.textContent += operatorSign;
    })
});

equal.addEventListener('click', ()=>{
    let clickedNumbers = result.textContent.split(operatorSign);
    secondNumber = parseInt(clickedNumbers[1]);
    const answer = operate(parseInt(firstNumber), secondNumber, operatorSign);
    const answerDiv = document.createElement('div');
    answerDiv.textContent = answer;
    result.appendChild(answerDiv);
})

