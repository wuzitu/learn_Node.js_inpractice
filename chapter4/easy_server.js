var http = require('http');
var server = http.createServer(function(req,res){
    body = '<h1>Hello world<h1/><br/><p>it\'s a beautiful world</p>'
    res.setHeader('Content-Type', 'text/html')
    res.statusCode = 302;
    res.write(body);
    res.end();
    console.log('server opend 3000');
});
server.listen(3000);