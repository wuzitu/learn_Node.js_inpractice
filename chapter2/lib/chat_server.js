/**
 *
 * Created by wulei on 16-9-21.
 */
var socketio = require('socket.io');
var io;
var guestNumber = 1;
var nickNames = {};
var namesUsed = [];
var currentRoom = {};

//server.js中会调用这个函数。它启动Socket.IO服务器，限定Socket.IO向控制台输出的日志的详细程度，并确定该如何处理每个接进来的连接。
exports.listen = function(server){
    io = socketio.listen(server);
    io.set('log level',1);
    //定义每个用户链接的处理逻辑。
    io.sockets.on('connection',function(socket){
        //用户连接上来时赋予一个访客名。
        guestNumber = assignGuestName(socket, guestNumber,nickNames, namesUsed);
        joinRoom(sockte, 'Lobby');
        //处理用户消息，更名，聊天室创建与变更。
        handleMessageBroadcasting(socket, nickNames);
        handleNameChangeAttempts(socket, nickNames, namesUsed);
        handleRoomJoining(socket);
        //用户发出请求时，向其提供已被占用的聊天室列表。
        socket.on('rooms', function(){
            socket.emit('rooms',io.sockets.manager.rooms);
        });
        //用户断开后的清除逻辑。
        handleClientDisconnection(socket, nickNames, namesUsed);
    });
};

