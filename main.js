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
            return Math.round(plus * 10) / 10;
            break;
        case '-':
            const minus = subtract(nbr1, nbr2);
            return Math.round(minus * 10) / 10;
            break;
        case 'x':
            const times = multiply(nbr1, nbr2);
            return Math.round(times * 10) / 10;
            break;
        default:
            const divides = divide(nbr1, nbr2);
            return Math.round(divides * 10) / 10;
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
        let arrayOfClickedElements = [];
        let clickedElements = result.textContent;

        for(let i = 0; i < clickedElements.length; i++){
            arrayOfClickedElements.push(clickedElements[i]);
        }

        const numberOfSigns = arrayOfClickedElements
                                .filter(element=>element == 'x' || element== '/' || element == '+' || element == '-')
                                .reduce((tot, signs)=>{
                                    return tot+1;
                                },0);                            
    
        if(numberOfSigns>1){
            
            let firstPair = clickedElements.slice(0, clickedElements.length - 1);
            const listOfOperatorSigns = Array.from(document.querySelectorAll('.operator'));
            const firstOperatorSign = listOfOperatorSigns
                                        .map(operateSign => operateSign.textContent)
                                        .filter(sign=>firstPair.includes(sign))
             
            let clickedNumbers = firstPair.split(firstOperatorSign[0]);
            firstNumber = Number(clickedNumbers[0]);
            secondNumber = Number(clickedNumbers[1]);
            const answer = operate(firstNumber, secondNumber, firstOperatorSign[0]);
            
            operatorSign = clickedElements[clickedElements.length - 1];
            firstNumber = answer;
            result.textContent = `${firstNumber}${operatorSign}`

        }
    })
});

equal.addEventListener('click', ()=>{
    let clickedNumbers = result.textContent.split(operatorSign);
    secondNumber = Number(clickedNumbers[1]);
    const answer = operate(Number(firstNumber), secondNumber, operatorSign);
    const answerDiv = document.createElement('div');
    answerDiv.textContent = answer;
    result.appendChild(answerDiv);
})

