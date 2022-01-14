const colors = require("colors/safe");

let [...nums] = process.argv.slice(2);
const findSimpleNums = (nums) =>{
    let num1 = nums[0];
    let num2 = nums[1];
    let simpleNums = [];
    for(let i = num1; i <= num2; i++) {
        if(!Number.isInteger(i) || num1 >= num2){
            console.log("Wrong input parameters, enter two numbers, first less, then second");
        } else if(i < 2){
            i++
        } else if(checkSimpleNumber(i)){
            simpleNums.push(i)
         }
        }
    if(simpleNums){
        colorize(simpleNums)
    } else console.log("Wrong input parameters, enter two numbers");
}

const checkSimpleNumber = (n) => {
    if (n === 1 || (n % 2 === 0 && n !== 2) || (n % 3 === 0 && n !== 3) || (n % 5 === 0 && n !== 5) || (n % 7 === 0 && n !== 7)) {
    } else {
        let result = n;
        return result;
    }
}

let colorize = (arr) =>{
    let counter = 0;
    for(let t = 1; arr.length > counter; t++ ){
        switch (t){
            case 1:
                console.log(colors.yellow(arr[counter]));
                counter++
                break;
            case 2:
                console.log(colors.green(arr[counter]));
                counter++;
                break;
            case 3:
                console.log(colors.red(arr[counter]));
                counter++
                t = 0
                break;
        }
    }
}

findSimpleNums(nums)