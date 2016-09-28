/**
 * Created by Administrator on 2016/9/27.
 */
var events = require('events');
var net = require('net');
var channel = new events.EventEmitter();
console.log(channel);
channel.clients = {};
channel.subscriptions = {};

channel.on('join',function(id,client){
    console.log(id);
    this.clients[id] = client;
    this.subscriptions[id] = function(senderId,message){
        //忽略发广播的用户
        if (id!= senderId){
            this.clients[id].write(message);
        }
    };
    console.log(this.clients[id],this.subscriptions[id]);
    //针对当前用户的broadcast事件监听器
    this.on('broadcast',this.subscriptions[id]);
});

var server = net.createServer(function (client) {

    var id = client.remoteAddress + ':' + client.remotePort;
    // client.on('data',function () {
    //     console.log(id);
    // })
    client.on('connect', function () {
        console.log(id);
        channel.emit('join',id,client);
    });
    client.on('data', function (data) {
        data = data.toString();
        console.log(data);
        channel.emit('broadcast', id, data);
    });
});
server.listen(8888);


