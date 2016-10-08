/**
 * Created by wulei on 2016/9/28.
 */

function Watcher(watchDir, processedDir){
    this.watchDir = watchDir;
    this.processdDir = processedDir;
}

var events = require('events')
    ,util = require('util');
//用inherits函数继承另一个对象里的行为
util.inherits(Watcher, events.EventEmitter);
//扩展事件发射器功能
var fs = require('fs')
    ,watchDir = './watch'
    ,processedDir = './done';
Watcher.prototype.watch = function () {
    //保存对watcher对象的引用，以便回调readdir中使用。
    var watcher = this;
    fs.readdir(this.watchDir, function (err, files) {
        if (err) throw err;
        for(var index in files){
            //处理watch目录中所有文件。
            watcher.emit('process', files[index]);
        }
    })
};
Watcher.prototype.start = function(){
    var watcher = this;
    fs.watchFile(watchDir, function () {
        watcher.watch();
    });
};

var watcher = new Watcher(watchDir, processedDir);
//利用新创建的Watcher对象。
watcher.on('process', function process(file){
    var watchFile = this.watchDir + '/' + file;
    var processedFile = this.processedDir + '/' + file.toLowerCase();
    fs.rename(watchFile, processedFile, function(err){
        if (err) throw err;
    });
});
watcher.start();
