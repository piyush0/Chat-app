/**
 * Created by piyush0 on 28/04/17.
 */
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

let socket2users = {};
let users2socket = {};

io.on('connection', function (socket) {
    socket.on('login', function (data) {
        socket2users[socket.id] = data.username.toString();
        users2socket[data.username] = socket.id;

        socket.broadcast.emit('people', {
            online: "online",
            username: data.username
        })
    });

    socket.on('chat', function (data) {
        console.log(data.chat);
        let str = data.chat;
        if (data.chat.charAt(0) == '@') {

            let user = str.substr(1, str.indexOf(' ') - 1);
            console.log(user.length);
            console.log(users2socket);
            console.log(users2socket[user]);
            io.sockets.connected[users2socket[user]].emit('chat', {
                chat: data.chat.substring(data.chat.indexOf(' ')),
                sender: socket2users[socket.id]
            });
        } else {
            io.emit('chat', {
                chat: data.chat,
                sender: socket2users[socket.id]
            })
        }

    });

    socket.on('disconnect', function (data) {
        socket.broadcast.emit('people', {
            online: "offline",
            username: socket2users[socket.id]
        })
    })
});


app.use('/', express.static(__dirname + '/public_static'));


server.listen(3456, function () {
    console.log("Server started on http://localhost:3456");
});