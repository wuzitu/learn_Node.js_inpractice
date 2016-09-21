/**
 *
 * Created by wulei on 16-9-21.
 */

//初始传入socketIO的参数socket
var Chat = function(socket){
    this.socket = socket;
};
//添加发送聊天消息的函数：
Chat.prototype.sendMessage = function(room, text){
    var message = {
        room: room,
        text: text
    }
};
//变更房间的函数



