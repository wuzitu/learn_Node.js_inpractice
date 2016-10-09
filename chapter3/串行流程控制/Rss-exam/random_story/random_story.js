/**
 * Created by wulei on 2016/10/9.
 */
var fs = require('fs');
var request = require('request');
var htmlparser = require('htmlparser');
var configFilename = './rss_feeds.txt';
//确认包含RSS预定源URL列表的文件存在。
function checkForRSSFile() {
    fs.exists(configFilename, function (exists) {
        if (!exists)
            return next(new Error('Missing Rss file: '+configFilename));
    });
}
//2.读取并解析包含预定源URL的文件
function readRSSFile(configFilename) {
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
function downloadRSSFeed(feedUrl) {

}

