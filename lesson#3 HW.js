// По ссылке вы найдете файл с логами запросов к серверу весом более 2 Гб. Напишите программу, которая находит в этом файле все записи с ip-адресами 89.123.1.41 и 34.48.240.111, а также сохраняет их в отдельные файлы с названием “%ip-адрес%_requests.log”.

const fs = require('fs');
const readLine = require('readline')

const readStream =  fs.createReadStream('../access.log', {
    highWaterMark: 64,
})

const writeStreamOne = fs.createWriteStream('./89.123.1.41_requests.log')
const writeStreamTwo = fs.createWriteStream('./34.48.240.111_requests.log')

const rl = readLine.createInterface(readStream);

const regexOne = new RegExp(`89.123.1.41`)
const regexTwo = new RegExp('34.48.240.111')

rl.on('line', (chunk) =>{
    if(regexOne.test(chunk) ) {
        // console.log(`chunk1: ${chunk}`)
        writeStreamOne.write(`${chunk}\n`)
    } if(regexTwo.test(chunk)){
        // console.log(`chunk2: ${chunk}`)
        writeStreamTwo.write(`${chunk}\n`)
    }
})