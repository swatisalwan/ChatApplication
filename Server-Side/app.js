// Creating Express Object
var express = require('express')
var app= express();


// Creating server using http
var http = require('http');
var server=http.createServer(app);

// Opening a socket whenever a user connects with the server using url.
// If 100 connections connect, 100 sockets will open

var io =require('socket.io').listen(server);
io.on('connection',(socket)=>{
    console.log("Socket Opened")


    socket.on('new_joine',(data)=>{
        socket.join(data.room);
        socket.in(data.room).broadcast.emit('server_new_joine',{
            date:new Date,
            user: data.user,
            message:data.user + ' successfully joined' + data.room
        })
    })

    socket.on('left_joine',(data)=>{
        socket.leave(data.room);
        socket.in(data.room).broadcast.emit('server_joine_left',{
            date:new Date,
            user: data.user,
            message:data.user + ' left' + data.room
        })
    })

    socket.on('client_new_msg',(data)=>{
        io.in(data.room).emit('server_new_message',{
            date:new Date,
            user: data.user,
            message:data.message
        })
    })

})






server.listen(3000,()=>{
    console.log('Server Started') 
})