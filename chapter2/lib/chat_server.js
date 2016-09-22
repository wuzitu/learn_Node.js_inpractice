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

//分配用户昵称
function assignGuestName(socket, guestNumber, nickNames, namesUsed){
    var name = 'Guest' +guestNumber;
    nickNames[socket.id] = name;
    socket.emit('nameResult',{
        success: true,
        name: name
    });
    namesUsed.push(name);
    return guestNumber + 1;
}
//进入聊天室
function joinRoom(socket, room){
    socket.join(room);
    currentRoom[socket.id] = room;
    socket.emit('joinResult', {room: room});
    socket.broadcast.to(room).emit('message',{
        text: nickNames[socket.id] + ' has joined ' + room + '.'
    });
    //确定哪些用户在房间里
    var usersInRoom = io.sockets.clients(room);
    if(usersInroom.length>1){
        var userSocketId = usersInRoom[index].id;
        if(userSocketId != socket.id){
            if(index > 0){
                usersInRoomSummary += ', ';
            }
        }
        usersInRoomSummary += '.';
        //将房间里其他用户的汇总发给该用户
        socket.emit('message', {text: usersInRoomSummary});
    }
}
//更名请求处理
function handleNameChangeAttempts(socket, nickNames, namesUsed){
    socket.on('nameAttempt', function(name){
        //不能以Guest开头
        if (name.indexOf('Guest') == 0){
            socket.emit('nameResult',{
                success: false,
                message: 'Names cannot begin with "Guest".'
            });
        }
        else {
            //如果还没注册，就注册。
            if (namesUsed.indexOf(name) == -1){
                var previousName = nickNames[socket.id];
                var previousNameIndex = namesUsed.indexOf(previousName);
                namesUsed.push(name);
                nickNames[socket.id] = name;
                //删掉之前用的昵称。
                delete namesUsed[previousNameIndex];
                socket.emit('nameResult',{
                    success: true,
                    name: name
                });
                socket.broadcast.to(currentRoom[socket.id]).emit('message',{
                    text: previousName + 'is now known as' + name + '.'
                });
            }
            //如果昵称被占用，提示错误。
            else {
                socket.emit('nameResult',{
                    success: false,
                    message: 'that name is already in use.'
                });
            }
        }
    });
}
//socket.IO的broadcast函数是用来转发消息的。
function handleMessageBroadcasting(socket){
    socket.on('message', function(message){
        socket.broadcast.to(message.room).emit('message',{
            text: nickNames[socket.id] + ': ' + message.text
        });
    });
}
//添加让用户加入已有房间的逻辑
function handleRoomJoining(socket){
    socket.on('join', function(room){
        socket.leave(currentRoom[socket.id]);
        joinRoom(socket, room.newRoom);
    })
}
//用户断开连接
function handleClientDisconnection(socket){
    socket.on('disconnect', function(){
        var nameIndex = namesUsed.indexOf(nickNames[socked.id]);
        delete namesUsed[nameIndex];
        delete nickNames[socket.id];
    });
}












