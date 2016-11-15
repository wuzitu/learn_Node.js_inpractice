function setup(format){
    var regexp = /:(\w+)/g;//匹配请求属性
    return function logger(req, res, next){
        //正则表达式格式化请求的日志条目
        var str = format.replace(regexp, function(match, property){
            return req[property];
        });
    console.log(str);
    next();
    }
}
//直接导出logger的setup函数
module.exports = setup;