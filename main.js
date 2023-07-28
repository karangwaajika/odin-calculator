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
        if(result.firstElementChild !== null){
            result.firstElementChild.remove(); 
            result.textContent = e.target.textContent;
        }
        else if(body.lastElementChild.getAttribute('class') == "error"){
            body.lastElementChild.remove();
            result.textContent += e.target.textContent;
        }
        else{
            result.textContent += e.target.textContent;
        }


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
    if(body.lastElementChild.getAttribute('class') == "error"){
        body.lastElementChild.remove();
    }
    if(result.lastElementChild !== null){
        result.lastElementChild.remove();
    }
    else{
        let subResult = result.textContent.slice(0,result.textContent.length-1); //remove the last element
        result.textContent = subResult;
    }
    
})
operators.forEach(sign => {
    sign.addEventListener('click', x=>{
        if(result.firstElementChild !== null){
            result.firstElementChild.remove(); 
        }
        if(body.lastElementChild.getAttribute('class') == "error"){
            body.lastElementChild.remove();
        }
        
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
            errorDiv.textContent = "You can't divide by 0 !!!";
            body.appendChild(errorDiv);
        }
        else if(x.target.textContent == '+' && firstNumber == ''){
            result.textContent = firstNumber;
        }
        else if(firstNumber[firstNumber.length -1] =='x' && x.target.textContent == '/'){
            result.textContent = firstNumber; // prevent "x/" signs be used one after another
        }
        else if(firstNumber[0] == '-' && checkSequenceOperator > 0 && x.target.textContent == 'x'){
            result.textContent = firstNumber; // prevent "-x" signs be used one after another if - is the first number
        }
        else if(firstNumber[0] == '-' && checkSequenceOperator > 0 && x.target.textContent == '/'){
            result.textContent = firstNumber; // prevent "-x" signs be used one after another if - is the first number
        }
        else if(firstNumber[0] == '-' && checkSequenceOperator > 0 && x.target.textContent == '+'){
            result.textContent = firstNumber; // prevent "-x" signs be used one after another if - is the first number
        }
        else if(firstNumber[firstNumber.length -1] =='/' && x.target.textContent == 'x'){
            result.textContent = firstNumber; //prevent "/x" signs be used one after another
        }
        else if(firstNumber[firstNumber.length -1] =='-' && firstNumber[firstNumber.length -2] =='x'){
            result.textContent = firstNumber; //prevent 3 consecutive signs
        }
        else if(firstNumber[firstNumber.length -1] =='-' && firstNumber[firstNumber.length -2] =='/'){
            result.textContent = firstNumber; //prevent 3 consecutive signs
        }
        else if(firstNumber[firstNumber.length -1] =='x' && x.target.textContent =='+'){
            result.textContent = firstNumber; //prevent x+ consecutive signs
        }
        else if(firstNumber[firstNumber.length -1] =='/' && x.target.textContent =='+'){
            result.textContent = firstNumber; //prevent /+ consecutive signs
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
                    let inputText=clickedElements.toString();
                    if(inputText[inputText.length -2] == 'x' && inputText[inputText.length -1] =='-'){
                        result.textContent += ''; // in case x sign is followed by - sign do not operate right way 
                    }
                    else if(inputText[inputText.length -2] == '/' && inputText[inputText.length -1] =='-'){
                        result.textContent += '';   // in case / sign is followed by - sign do not operate right way
                    }
                    else{
                
                        let firstPair = clickedElements.slice(0, clickedElements.length - 1);
                        let withNoMinusSign = firstPair.slice(1);
                        const listOfOperatorSigns = Array.from(document.querySelectorAll('.operator'));
                        const firstOperatorSign = listOfOperatorSigns
                                                    .map(operateSign => operateSign.textContent)
                                                    .filter(e=>withNoMinusSign.includes(e));
                         
                                                
                        if(firstOperatorSign[0] == '-'){
                           
                            let inputText=withNoMinusSign;
                            let positionOfOperator=inputText.indexOf(firstOperatorSign[0]);
                            if(firstOperatorSign[0] == '-' && inputText[positionOfOperator -1] == 'x' ){ // checking if has "first-number x- second-number"
                                let clickedNumbers = withNoMinusSign.split('x');
                                firstNumber = Number('-'+clickedNumbers[0]);
                                secondNumber = Number(clickedNumbers[1]);
                                firstOperatorSign[0] = 'x';
                            }
                            else if(firstOperatorSign[0] == '-' && inputText[positionOfOperator -1] == '/'){// checking if has "first-number /- second-number"
                                let clickedNumbers = withNoMinusSign.split('/');
                                firstNumber = Number('-'+clickedNumbers[0]);
                                secondNumber = Number(clickedNumbers[1]);
                                firstOperatorSign[0] = '/';
                            }
                            else{
                                let clickedNumbers = withNoMinusSign.split(firstOperatorSign[0]);
                                firstNumber = Number('-'+clickedNumbers[0]);
                                secondNumber = Number(clickedNumbers[1]);
                            } 
                        
                         
                        }
                        else{
                            
                            let clickedNumbers = firstPair.split(firstOperatorSign[0]);
                            firstNumber = Number(clickedNumbers[0]);
                            secondNumber = Number(clickedNumbers[1]);  
                        }                       
                        
                        if(secondNumber != '' || secondNumber =='0'){
                            const answer = operate(firstNumber, secondNumber, firstOperatorSign[0]);
                        
                            operatorSign = clickedElements[clickedElements.length - 1];
                            firstNumber = answer;
                            result.textContent = `${firstNumber}${operatorSign}`;
                        }
                        else{
                            result.textContent = `${firstNumber}${x.target.textContent}`;
                        }
                    
                    }
        
                }
            } 
            else{
                if(numberOfSigns>1){
                    let inputText=clickedElements.toString();
                    if(inputText[inputText.length -2] == 'x' && inputText[inputText.length -1] =='-'){
                        result.textContent += ''; // in case x sign is followed by - sign do not operate right way 
                    }
                    else if(inputText[inputText.length -2] == '/' && inputText[inputText.length -1] =='-'){
                        result.textContent += '';   // in case / sign is followed by - sign do not operate right way
                    }
                    else{
                        let firstPair = clickedElements.slice(0, clickedElements.length - 1);
                        const listOfOperatorSigns = Array.from(document.querySelectorAll('.operator'));
                        const firstOperatorSign = listOfOperatorSigns
                                                    .map(operateSign => operateSign.textContent)
                                                    .filter(e=>firstPair.includes(e));
                        
                                                    
                        let inputText=firstPair;
                        let positionOfOperator=inputText.indexOf(firstOperatorSign[0]);
                        if(firstOperatorSign[0] == '-' && inputText[positionOfOperator -1] == 'x' ){ // checking if has "first-number x- second-number"
                            let clickedNumbers = firstPair.split('x');
                            firstNumber = Number(clickedNumbers[0]);
                            secondNumber = Number(clickedNumbers[1]);
                            firstOperatorSign[0] = 'x';
                        }
                        else if(firstOperatorSign[0] == '-' && inputText[positionOfOperator -1] == '/'){// checking if has "first-number /- second-number"
                            let clickedNumbers = firstPair.split('/');
                            firstNumber = Number(clickedNumbers[0]);
                            secondNumber = Number(clickedNumbers[1]);
                            firstOperatorSign[0] = '/';
                        }
                        else{
                            let clickedNumbers = firstPair.split(firstOperatorSign[0]);
                            firstNumber = Number(clickedNumbers[0]);
                            secondNumber = Number(clickedNumbers[1]);
                        }                            
                        
                        if(secondNumber != '' || secondNumber =='0' ){
                            const answer = operate(firstNumber, secondNumber, firstOperatorSign[0]);
                        
                            operatorSign = clickedElements[clickedElements.length - 1];
                            firstNumber = answer;
                            result.textContent = `${firstNumber}${operatorSign}`;
                        }
                        else{
                            result.textContent = `${firstNumber}${x.target.textContent}`;
                        }
                    }
                    
        
                }
            }                                                 
           

        }
       
    })
});

equal.addEventListener('click', ()=>{
    if(result.lastElementChild == null){

    if(operatorSign === undefined){
        alert("Please Provide an Operator!");
    }
    else{
        let inputText=result.textContent;
        let positionOfOperator=inputText.indexOf(operatorSign);
        if(operatorSign == '-' && inputText[positionOfOperator -1] == 'x' ){ // checking if has "first-number x- second-number"
            let clickedNumbers = result.textContent.split('x');
            firstNumber = clickedNumbers[0];
            secondNumber = clickedNumbers[1];
            operatorSign = 'x';
        }
        else if(operatorSign == '-' && inputText[positionOfOperator -1] == '/'){// checking if has "first-number /- second-number"
            let clickedNumbers = result.textContent.split('/');
            firstNumber = clickedNumbers[0];
            secondNumber = clickedNumbers[1];
            operatorSign = '/';
        }
        else{
            if(operatorSign == '-' && inputText[0] =='-'){
                let withNoMinusSign = inputText.slice(1);
                let positionOfOperator=withNoMinusSign.indexOf(operatorSign);
                
                if(withNoMinusSign[positionOfOperator -1] == '/'){
                    let clickedNumbers = withNoMinusSign.split('/');
                    firstNumber = `-${clickedNumbers[0]}`;
                    secondNumber = clickedNumbers[1];
                    operatorSign = '/';
                }
                 else if(withNoMinusSign[positionOfOperator -1] == 'x'){
                    let clickedNumbers = withNoMinusSign.split('x');
                    firstNumber = `-${clickedNumbers[0]}`;
                    secondNumber = clickedNumbers[1];
                    operatorSign = 'x';
                    
                }
                else{
                    let clickedNumbers = withNoMinusSign.split(operatorSign);
                    firstNumber = `-${clickedNumbers[0]}`;
                    secondNumber = clickedNumbers[1];
                }
                
            }
            else{
                let clickedNumbers = result.textContent.split(operatorSign);
                secondNumber = clickedNumbers[1];
            }
            
        }
        console.log(firstNumber)
        console.log(secondNumber)
        if(firstNumber == ''){
            alert("Please Provide First Number!");
        }
        else if(secondNumber == '' || secondNumber == undefined){
            alert("Please Provide Second Number!");
        }
        else{
            if(secondNumber == '0' && operatorSign =='/'){
                const errorDiv = document.createElement('div');
                errorDiv.classList.add('error');
                errorDiv.textContent = "You can't divide by 0 !!!";
                body.appendChild(errorDiv);
            }
            else{
                const answer = operate(Number(firstNumber), Number(secondNumber), operatorSign);
                const answerDiv = document.createElement('div');
                answerDiv.classList.add('answer');
                answerDiv.textContent = answer;
                result.appendChild(answerDiv);
            }
        }
    }
}
})

clear.addEventListener('click', ()=>{
    result.textContent = '';
    if(body.lastElementChild.getAttribute('class') == "error"){
        body.lastElementChild.remove();
    }
})