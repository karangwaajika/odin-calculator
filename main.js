let firstNumber;
let secondNumber;
let operator;
let operatorSign;
const numbers = document.querySelectorAll('.number');
const result = document.querySelector('.result');
const equal = document.querySelector('.equal');
const operators = document.querySelectorAll('.operator');
const clear = document.querySelector('.clear');
const body = document.querySelector('body');
const decimal = document.querySelector('.decimal');
const deleteBtn = document.querySelector('.delete');



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

decimal.addEventListener('click',e=>{
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
    if(numberOfSigns==0){
        if(!result.textContent.includes('.')){ //check the first number if it has "."
            result.textContent += e.target.textContent;
        }
    } 
    else{

        let clickedNumbers = result.textContent.split(operatorSign);
        let secondDigit = clickedNumbers[1];
        if(!secondDigit.toString().includes('.') && secondDigit != ''){ //check the second number if it has "." avoid to be preceded by an operator
            result.textContent += e.target.textContent;
        }
    }                           
})
deleteBtn.addEventListener('click', ()=>{
    let subResult = result.textContent.slice(0,result.textContent.length-1); //remove the last element
    result.textContent = subResult;
})
operators.forEach(sign => {
    sign.addEventListener('click', x=>{
        let checkSequenceOperator = 0;
        firstNumber = result.textContent;
        let operatorsElement = Array.from(operators).map(el => el.textContent);
        for(i in operatorsElement){
            if(operatorsElement[i] == firstNumber[firstNumber.length -1]){
                checkSequenceOperator++;
            }
        }
                       
        if(x.target.textContent == '/' && firstNumber == ''){
            result.textContent = firstNumber;
        }
        else if(x.target.textContent == 'x' && firstNumber == ''){
            result.textContent = firstNumber;
        }
        else if(firstNumber[firstNumber.length -2] == '/' && firstNumber[firstNumber.length -1] == '0'){
            const errorDiv = document.createElement('div');
            errorDiv.classList.add('error');
            errorDiv.textContent = "You can't devide by 0 !!!";
            body.appendChild(errorDiv);
        }
        else if(x.target.textContent == '+' && firstNumber == ''){
            result.textContent = firstNumber;
        }
        else if(checkSequenceOperator > 0 && x.target.textContent == firstNumber[firstNumber.length -1]){
            result.textContent = firstNumber;
        }
        else{
            operatorSign = x.target.textContent;
            result.textContent += operatorSign;
            let arrayOfClickedElements = [];
            let clickedElements = result.textContent;
    
            for(let i = 0; i < clickedElements.length; i++){
                arrayOfClickedElements.push(clickedElements[i]);
            }
    
            let numberOfSigns = arrayOfClickedElements
                                    .filter(element=>element == 'x' || element== '/' || element == '+' || element == '-')
                                    .reduce((tot, signs)=>{
                                        return tot+1;
                                    },0);  
            if(clickedElements[0] == '-'){
                numberOfSigns--;
                if(numberOfSigns>1){
                
                    let firstPair = clickedElements.slice(0, clickedElements.length - 1);
                    let withNoMinusSign = firstPair.slice(1);
                    console.log(`no = ${withNoMinusSign}`);
                    const listOfOperatorSigns = Array.from(document.querySelectorAll('.operator'));
                    const firstOperatorSign = listOfOperatorSigns
                                                .map(operateSign => operateSign.textContent)
                                                .filter(e=>withNoMinusSign.includes(e));
                                           
                    let clickedNumbers = firstPair.split(firstOperatorSign[0]);
                    firstNumber = Number(clickedNumbers[0]);
                    secondNumber = Number(clickedNumbers[1]);
                    if(secondNumber != ''){
                        const answer = operate(firstNumber, secondNumber, firstOperatorSign[0]);
                    
                        operatorSign = clickedElements[clickedElements.length - 1];
                        firstNumber = answer;
                        result.textContent = `${firstNumber}${operatorSign}`
                    }
                    else{
                        result.textContent = firstNumber+x.target.textContent;
                    }
                    
                    
        
                }
            } 
            else{
                if(numberOfSigns>1){
                
                    let firstPair = clickedElements.slice(0, clickedElements.length - 1);
                    const listOfOperatorSigns = Array.from(document.querySelectorAll('.operator'));
                    const firstOperatorSign = listOfOperatorSigns
                                                .map(operateSign => operateSign.textContent)
                                                .filter(e=>firstPair.includes(e));
                                                                 
                    let clickedNumbers = firstPair.split(firstOperatorSign[0]);
                    firstNumber = Number(clickedNumbers[0]);
                    secondNumber = Number(clickedNumbers[1]);
                    if(secondNumber != ''){
                        const answer = operate(firstNumber, secondNumber, firstOperatorSign[0]);
                    
                        operatorSign = clickedElements[clickedElements.length - 1];
                        firstNumber = answer;
                        result.textContent = `${firstNumber}${operatorSign}`
                    }
                    else{
                        result.textContent = firstNumber+x.target.textContent;
                    }
                    
                    
        
                }
            }                                                 
           

        }
       
    })
});

equal.addEventListener('click', ()=>{
    
    if(operatorSign === undefined){
        alert("Please Provide an Operator!");
    }
    else{
        let clickedNumbers = result.textContent.split(operatorSign);
        secondNumber = clickedNumbers[1];
        if(firstNumber == ''){
            alert("Please Provide First Number!");
        }
        else if(secondNumber == ''){
            alert("Please Provide Second Number!");
        }
        else{
            if(secondNumber == '0' && operatorSign =='/'){
                const errorDiv = document.createElement('div');
                errorDiv.classList.add('error');
                errorDiv.textContent = "You can't devide by 0 !!!";
                body.appendChild(errorDiv);
            }
            else{
                const answer = operate(Number(firstNumber), Number(secondNumber), operatorSign);
                const answerDiv = document.createElement('div');
                answerDiv.textContent = answer;
                result.appendChild(answerDiv);
            }
        }
    }
})

clear.addEventListener('click', ()=>{
    result.textContent = '';
})