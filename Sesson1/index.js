//EX 3: COUNT UPPER CASES
function getUpperLettersNumber(str){
    if(!str) return 0;  //If string is null, return 0
    var count = 1;  //Counter for Upper letters      
    for(let index = 0; index < str.length; index++) 
    {
        char = str[index];  //Assign str[i] to a variable
        if(char===char.toUpperCase()) count++;  //Check if this character is Upper
    }
    return count;
}


//EX 1.1: CONVERT INT/STRING TO CURRENCY
function toMoney(str){
    if(!str) return 0;  //Return 0 if string's null
    str = str.toString();   //Convert to String
    if(!hasDot(str))    //Check if it is decimal
    {
        money = str;    //Copy input
        count = 1;  //Used to count number
        for(let index = str.length - 1; index >= 0; index--)
        {
            if(count === 3) //Insert "," after 3 numbers from the back
            {
                money = [money.slice(0,index), ",", money.slice(index)].join(''); 
                count = 1;  //Reset counter
            }
            else count++;   //Increase counter in case it's lower than 3
        }
    }
    else{   //Process decimals
        for(let index = str.length - 1; index >= 0; index--)
        {
            if(str[index] === ".")
            {
                //Divide into integer and decimal
                nguyen = str.slice(0,index); //Integer
                decimal = str.slice(index);  //Decimal
                money = integer; //If integer, use the above code
                count = 1;
                for(let index = integer.length - 1; index >= 0; index--)
                {
                    if(count === 3)
                    {
                        money = [money.slice(0,index),",",money.slice(index)].join('');
                        count = 1;
                    }
                    else count++;
                }
                break;
            }
        }
        money = [money,decimal].join(''); //Join them back
    }
    console.log(money);
}

function hasDot(str){
    return str.includes(".");
}

//EX 1.2: SHORTEN MONEY
function shortenZeroes(numb)
{
    char=["","K","M","B","T"];
    index = 0;
    //Remove 3 mumbers from the back
    while(numb > 1000)  
    {
        numb /= 1000;
        index++; //With each 3 deleted numbers, change to K, M, B, ...
    }
    numb = numb.toString(); //Convert to string
    money = [numb.slice(0,5),char[index]].join('')
    console.log(money);
}


//EX 1.4: GET EXTENSION
function getExtension(str)
{
    return str.split('.').pop()
}

//EX 2.1: CALCULATE FACTORIAL
factorial = 1;
function getFactorial(numb)
{
    if(numb == 1 || numb == 0) return factorial;    //If number is factorial of 1 or 0, return it
    else 
    {
        factorial *= numb;  //Multiple factorial by current number
        return getFactorial(numb-1);    //Decrease number by 1, restart process until it is either 1 or 0
    }
}

//EX 2.2: GET RANDOM BETWEEN RANGE
function getRandomNumber(min,max)
{
    inirandom = Math.random();  //Use Math.random() function to generate a random number in [0;1]
    random = inirandom * (max-min); //Extend that range by min and max
    random = Math.floor(random);    //Round it up
    random = random + min;
    return random;
}

function getRandomElement(array)
{
    inirandom = Math.random();
    random = inirandom * (array.length-1);
    random = Math.floor(random);
    return array[random];
}

//EX 2.3: FIND MISSING ELEMENT
function getMissing(arr,brr)
{
    crr = arr; //copy input
    for(let index = 0; index < brr.length; index++)
    {
        index = crr.indexOf(brr[i]);    //Find values in 1st array which are the same with those in 2nd array
        if (index > -1) {   //Remove them if so
            crr.splice(index, 1);
          }
    }   //After this loop, we would receive an array which only contains values 2nd array doesn't have
    return crr;
}

//MINE SWEEPER. Em lam cho vui
function generateBomb(size,bomb)
{
    //Generate an all zeroes matrix 
    brr =  new Array(size);
    for(let i = 0; i < size; i++) brr[i] = new Array(size).fill(0); 
    
    //Generate bombs
    for(let i = 0; i < bomb; i ++)
    {
        random_row = Math.random() * size;
        random_column = Math.random() * size;
        random_row = Math.floor(random_row);
        random_column = Math.floor(random_column);
        if(brr[random_row][random_column] !== -1) brr[random_row][random_column] = -1;
        else i--;
    }

    //Generate hints
    for(let i = 0; i < size; i++)
    {
        for (let j = 0; j < size; j++)
        {
            if(brr[i][j]!== -1)
                brr[i][j] = getSurrounding(brr,i,j,size);
            
        }
    }
    return brr;
}

function getSurrounding(brr,r,c,size)
{
    count = 0;
    for(let a = r-1 ; a <= r+1; a++)
    {
        if(a>=0 && a<size)
        {
            for(let b = c-1; b<=c+1; b++)
            {
                if(b>=0 && b<size)
                {
                    if(brr[a][b]===-1) count++;
                }       
            }
        }        
    }
    return count;
}


//EX 3: FIND WAY BACK TO MY HOME
function move(brr,MAX_row,MAX_column)
{
    safe_way =  new Array(MAX_column);
    for(let i = 0; i < MAX_column; i++) safe_way[i] = new Array(MAX_row).fill(-1); 
    //console.log(safe_way);
    for(let col = 0; col < MAX_column; col++)
    {
        for(let row = 0,count = 0; row < MAX_row; row++)
        {
            if(brr[col][row] === 0) 
            {
                console.log("Step into column: " + col + " and row: " + row);
            }
        }
    }
}
matrix = [[0,1,1],[0,1,1],[0,1,1],[0,1,1],[0,0,1]];
matrix2 = [[0,1,1],[1,0,1],[1,1,0],[1,0,1],[1,1,1]];

function goHome()
{
    console.log(matrix);
    move(matrix,3,5);
}