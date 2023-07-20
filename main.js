let firstNumber;
let secondNumber;
let operator;

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

console.log(operate(1,2,'addition'));