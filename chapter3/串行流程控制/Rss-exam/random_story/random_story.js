/**
 * Created by wulei on 2016/10/9.
 */
var fs = require('fs');
var request = require('request');
var htmlparser = require('htmlparser');
var configFilename = './rss_feeds.txt';
//确认包含RSS预定源URL列表的文件存在。
function checkForRSSFile() {
    console.log("step1");
    fs.exists(configFilename, function (exists) {
        if (!exists)
            return next(new Error('Missing Rss file: '+configFilename));
        next(null, configFilename);
    });
}
//2.读取并解析包含预定源URL的文件
function readRSSFile(configFilename) {
    console.log("step2");
    fs.readFile(configFilename, function (err, feedList) {
        if (err) return next(err);
        feedList = feedList
            .toString()
            .replace(/^\s+|\s+$/g, '')
            .split("\n");
        //从预定源URL数组中选一个预定源URL
        var random = Math.floor(Math.random()*feedList.length);
        next(null, feedList[random]);
    });
}
//3.向选定的预定源发送Http请求以获取数据。
function downloadRSSFeed(feedUrl) {
    console.log("step3");
    request({url:feedUrl},function (err, res, body) {
        if (err) return next(err);
        if (res.statusCode != 200)
            console.log(res.statusCode);
            return next(new Error('Abnormal response status code'));
        console.log(res.statusCode);
        next(null,body);
    });
}
//4.将预定源数据解析到一个条目数组中。
function parseRSSFeed(rss) {
    console.log("step4");
    var handler = new htmlparser.RssHandler();
    var parser = new htmlparser.Parser(handler);
    parser.parseComplete(rss);
    if (!handler.dom.items.length)
        return next(new Error('No rss items found'));
    var item = handler.dom.items.shift();
    //如果有数据，显示第一个预定源条目title和url。
    console.log(item.title);
    console.log(item.link);
}
//将要做的任务按执行顺序添加到一个数组中。
var tasks = [checkForRSSFile,
              readRSSFile,
              downloadRSSFeed,
              parseRSSFeed];
//next()负责执行函数.
function next(err, result) {
    if (err) throw err;
    //从数组中取出下一个任务
    //shift ：删除数组第一个元素。
    var currentTask = tasks.shift();
    if (currentTask){
        currentTask(result);
    }
}
//开始串行化执行
next();



