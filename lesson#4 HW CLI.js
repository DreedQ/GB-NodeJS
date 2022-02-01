#!/Users/artemshashkov/.nvm/versions/node/v14.18.3/bin/node
const fs = require('fs');
const path = require('path');
const colors = require("colors/safe");
const inquirer = require('inquirer');

let executionDir = process.cwd();

const isDir = (file) => {
   const filePath = path.join(executionDir, file)
    return fs.lstatSync(filePath).isDirectory();
}

const init = () => {
    inquirer.prompt([{
        type: 'list',
        name: 'switchEnter',
        message: 'Выберете метод входа в приложение:',
        choices:["Ручной ввод", "Интерактивный интерфейс"]
    }]).then(({switchEnter})=>{
        if(switchEnter === 'Ручной ввод'){
            handInput()
        }  else
            fileDirObserver()
    })
}

const handInput=()=>{
    inquirer.prompt([
        {
            name: 'fileName',
            type: 'input',
            message: "Введите путь к файлу или директории:",
            default: './',
        }]).then(({fileName})=>main(fileName))
}

const fileDirObserver = () =>{
    let jumpUp = '../' // Перемещаемся по директориям и вверх
    let fileList = fs.readdirSync(executionDir)
    let fileListN = [jumpUp, ...fileList]
    inquirer.prompt([
        {
            name: 'fileName',
            type: 'list',
            message: `Выберите файл для чтения, вы находитесь в ${executionDir}`,
            choices: fileListN,
        },
    ]).then(({fileName})=>main(fileName))
};

const main = (fileName) => {
    console.log(fileName)
    if(isDir(fileName)){
        executionDir = path.join(executionDir, fileName)
        fileDirObserver();
    } else {
        const fullPath = path.join(executionDir, fileName);
        const data = fs.readFileSync(fullPath, 'utf-8');
        usePattern(data)
    }
}

const enterPattern = (data) => {
    inquirer.prompt([{
        type:'input',
        name: 'pattern',
        message: 'Введите искомое сочетание слов или слово',

    }]).then(({pattern})=>{
        console.log(colors.yellow(data.match(pattern)))
    })
}

const usePattern = (data) =>{
    inquirer.prompt([{
        type:'confirm',
        name: 'answer',
        message: 'Хотите использовать поиск по словам?',
    }]).then(({answer})=> {
        if(answer){
            return enterPattern(data);
        }else console.log(data);
        })
}

init();
export default