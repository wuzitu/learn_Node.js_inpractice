/**
 * Created by Administrator on 2016/9/27.
 */
var EventEmitter = require('events').EventEmitter;
var channel = new EventEmitter();
channel.on('join', function () {
    console.log("Welcome!");
});
channel.emit('join');


