let firstNumber;
let secondNumber;
let operator;
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
        result.textContent += sign.target.textContent;
    })
});

equal.addEventListener('click', ()=>{
    console.log(result.textContent)
})

