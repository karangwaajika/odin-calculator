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
    const addition = add(nbr1, nbr2);
    return addition;
}

numbers.forEach(nbr => {
    nbr.addEventListener('click',e=>{
        result.textContent += e.target.textContent;
    })
});

operators.forEach(sign => {
    sign.addEventListener('click', sign=>{
        firstNumber = result.textContent;
        operator = sign.target.getAttribute('id');
        operatorSign = sign.target.textContent;
        result.textContent += operatorSign;
    })
});

equal.addEventListener('click', ()=>{
    let clickedNumbers = result.textContent.split(operatorSign);
    secondNumber = clickedNumbers[1];
    console.log(result.textContent)
})

