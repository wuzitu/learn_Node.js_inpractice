var fs = require('fs');
var path = require('path');
//去掉“node cli_tasks.js”,只留下参数。
var args = process.argv.splice(2);
//取出第一个参数
var command = args.shift();
//合并剩余参数
var taskDescription = args.join(' ');
//根据当前工作目录解析数据库的相对路径。
var file = path.join(process.cwd(),'/.tasks');



