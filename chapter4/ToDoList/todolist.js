var http = require('http');
var items = [];
var server = http.createServer(function(req, res){
    if('/' == req.url){
        switch(req.method){
            case 'GET':
                show(res);
                break;
            case 'POST':
                add(req, res);
                break;
            default:
                badRequest(res);
        }
    }else{
        notFound(res);
    }
});
server.listen(3000);

//尽管一般都用模板引擎生成HTML标记，但为了简单起见，下面这个清单用的还是拼接字符串的办法。因为默认的响应状态就是200 OK，所以这里没必要给 res.statusCode 赋值。
function show(res){
    var html = '<html><head><title>Todo List</title></head><body>'
             +  '<h1>Todo List</h1>'
             +  '<ul>'
             +      items.map(function(item){
                        return'<li>'+item+'</li>'
                    }).join('')
             +  '</ul>'
             +  '<form action="/" method="post">'
             +  '<p><input type="text" name="item"></p>'
             +  '<p><input type="submit" value="add item"></p>'
             +  '</form></body></html>';
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', Buffer.byteLength(html));
    res.end(html);
}
function notFound(res){
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('fuck,not found');
}
function badRequest(req){
    res.statusCode = 400;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Bad Request');
}
var qs = require('querystring');//???
function add(req, res){
    var body = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk){body += chunk});
    req.on('end', function(){
        var obj = qs.parse(body);
        items.push(obj.item);
        show(res);
    });
}


