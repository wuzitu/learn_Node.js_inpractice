var connect = require('connect');
function logger(req, res, next){
    console.log('%S %S', req.method, req.url);
    next();
}
function hello(req, res){
    res.setHeader('Content-Type', 'text/plain');
    res.end('hello world~');
}
function restrict(req, res, next){
    var authorization = req.headers.authorization;
    if (!authorization) return next(new Error('Unauthorized'));
    var parts = authorization.split(' ');
    var scheme = parts[0];
    var auth = new Buffer(parts[1], 'base64').toString().split(':')
    var user = auth[0];
    var pass = auth[1];

    authenticateWithDatabase(user, pass, function(err){
        //告诉分派器出错了
        if(err) return next(err);
        //如果认证信息有效，不带参数调用next()
        next();
    })
}
function admin(req, res, next){
    switch(req.url){
        case '/':
            res.end('try /users');
            break;
        case '/users':
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(['tobi','loki','jane']));
            break;

    }
}
connect()
    .use(logger)
    .use('/blog', restrict)
    .use('/blog', admin)
    .use(hello)
    .listen(3000);

