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

