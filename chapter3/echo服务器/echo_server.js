/**
 * Created by wulei on 2016/9/27.
 */
var net = require('net');
var server = net.createServer(function(socket){
    socket.on('data', function (data) {
        socket.write(data);
    })
});

server.listen(8888);

