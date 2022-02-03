// В разделе, посвященном вебсокетам, мы сделали базовую основу для простого чата. В ней клиент может посылать сообщения серверу, и получать их обратно в виде обратно отображаемой строки. Также мы сделали оповещение всех клиентов о подключении нового клиента. В домашнем задании вам необходимо будет дополнить это приложение следующим функционалом:
// * Пользователи должны видеть не только сообщение о подключении нового клиента, но и об отключении клиента или переподключении;
// * На странице приложения необходимо различать сообщения от разных клиентов. Для этого генерируйте ник пользователя при его каждом его подключении;
// * Пользователи должны видеть сообщения серверу, которые были посланы другими пользователями.


const socket = require('socket.io');
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const indexPath = path.join(__dirname, 'index.html');
    const readStream = fs.createReadStream(indexPath);
    readStream.pipe(res);
});

const io = socket(server);

let usersOnline = [];

io.on('connection', (client) => {
    client.broadcast.emit('new_connection', { message: 'Подключился новый пользователь', user: client.id });

    client.emit('new_connection', { message: 'Ваш новый идентификатор', user: client.id });

    client.emit('init_user', client.id)

    usersOnline.push(client.id)

    client.on('client-msg', (data) => {
        const serverData = {
            message: data.message.split('').join(''),
            user: data.user,

        } ;
        client.broadcast.emit('server-msg', serverData);
        client.emit('server-msg', serverData);
    });

        client.broadcast.emit('server-users', usersOnline.join(", "));

        client.emit('server-users', usersOnline.join(', '))
});

io.on('disconnect', (client)=>{
    console.log(`Disconnected`)
    usersOnline.forEach((user)=>{
        if(user){
            usersOnline.filter(el=> el !== client.id)
            client.broadcast.emit('server-msg',{message: `${client.id} вышел из чата`} )
        }
    })
})

server.listen(3000)