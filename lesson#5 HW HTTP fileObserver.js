// Используйте наработки из домашнего задания прошлого урока для того, чтобы создать веб-версию приложения. При запуске она должна:
//      * Показывать содержимое текущей директории;
//      * Давать возможность навигации по каталогам из исходной папки;
//      * При выборе файла показывать его содержимое.

const http = require('http');
const fs = require('fs');
const path = require('path');
const {stringify} = require("nodemon/lib/utils");
const readLine = require("readline");

http.createServer((req, res)=>{
    let reqPath = '';
    if(req.url.match('favicon.ico')){
        return
    }else reqPath = req.url;
    if (req.method === 'GET') {
        let executionDir = process.cwd();
        const filePath = path.join(executionDir, reqPath);
        // console.log(filePath);
        if(fs.lstatSync(filePath).isDirectory()){

          fs.readdir(filePath,(err, dirs)=>{
                if(err){
                    console.log(err);
                } else {
                    let data = dirs.join(`\n`)
                    res.writeHead(200, { 'Content-Type': 'application/javascript'});
                    res.write(data)
                    res.end()
                }
            })
        } else {
            const readStream = fs.createReadStream(filePath);
            const rl = readLine.createInterface(readStream)
            res.writeHead(200, {'Content-Type': 'text/html'});
            rl.on('line', (chunk) => {
                let data = '';
                data += `<p>${chunk}</p>`
                res.write(data)
            });
            rl.on("close",()=> res.end())
        }
    } else {
        res.statusCode = 405;
        res.end();
    }
}).listen(3000)