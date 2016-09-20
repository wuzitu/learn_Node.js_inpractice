/**
 *
 * Created by wulei on 16-9-20.
 */
var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var cache = {};
//辅助函数，提供静态HTTP文件服务。
function send404(response){
    response.writeHead(404,{'Content-Type': 'text/plain'});
    response.write('error 404: resource not found.');
    response.end();
}
//提供文件数据服务。
function sendFile(response, filePath, fileContents){
    response.writeHead(
        200,
        {"content-type": mime.lookup(path.basename(filePath))}
    );
    response.end(fileContents);
}
//下一个辅助函数会确定文件是否缓存了，如果是，就返回它。如果文件还没被缓存，它会从硬盘中读取并返回它。如果文件不存在，则返回一个HTTP 404错误作为响应。
function serveStatic(response, cache, absPath){
    if(cache[absPath]){
        sendFile(response, absPath, cache[absPath]);
    }else{
        fs.exists(absPath,function(exists){
            if(exists){
                fs.readFile(absPath, function(err, data){
                    if(err) {
                        send404(response);
                    }
                    else {
                        cache[absPath]=data;
                        sendFile(response,absPath,data);
                    }
                });
            }
            else {
                send404(response);
            }
        });
    }
}
//添加http服务器
var server = http.createServer(function(request,response){
    var filePath = false;
    if (request.url == '/'){
        filePath = 'public/index.html';
    }
    else {
        filePath = 'public' + request.url;
    }
    var absPath = './' + filePath;
    serveStatic(response, cache, absPath);
});
server.listen(3000,function(){
    console.log("server listening on 3000~");
});







