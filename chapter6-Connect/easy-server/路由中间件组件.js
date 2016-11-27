//创建一个将请求映射到业务逻辑的路由器！
var connect = require('connect');
var router = require('./middleware/router');
var routes = {
    GET: {
        '/users': function(req,res){
            res.end('tobi, loki, ferret');
        },
        '/user/:id': function(req,res,id){
            res.end('user'+ id);
        }
    },
    DELETE: {
        '/user/:id': function(req, res, id){
            res.end('delete user'+ id);
        }
    }
};

connect()
    .use(router(routes))
    .listen(3000);
