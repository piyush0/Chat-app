/**
 * Created by piyush0 on 28/04/17.
 */

const socket = io();

setTimeout(function () {
    console.log(socket.id);
}, 1000);

$(function () {
    $('#btn_login').click(function () {
        let username = $('#username').val();
        socket.emit('login', {username: username});
        $('#btn_login').css('visibility', 'hidden');
        $('#username').css('visibility', 'hidden');
        $('#chatbox').css('visibility', 'visible');
        $('#btn_send').css('visibility', 'visible');
        $('#people').css('visibility', 'visible');
        $('#chat').css('visibility', 'visible');
    })

    $('#btn_send').click(function () {
        let chat = $('#chatbox').val();
        socket.emit('chat', {chat: chat});
    })
});

socket.on('chat', function (data) {
    $('#chat').append("<li>" + data.sender + " : " + data.chat + "</li>")
});

socket.on('people', function (data) {
    $('#people').append("<li>" + data.username + " : " + data.online + "</li>")
})