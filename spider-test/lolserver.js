var http = require('http');
var fs = require('fs');
var server = http.createServer(function (req, res) {
    getStory(res);    
    
}).listen(8000,"127.0.0.1");

function getChampion(champions,res) {
    fs.readFile('./championlist',function (err, data) {
        if (err) return hadError(err,res);
        getTemplate(champions,data.toString(),res)
    })
}
function getTemplate(champions,championlist, res) {
    fs.readFile('./hero.html',function (err, data) {
        if (err) return hadError(err,res);
        formateHtml(champions,championlist,data.toString(),res)
    })
}
function formateHtml(champions,championlist, tmpl, res) {
    var html = tmpl.replace('champion_list',championlist);
    html = html.replace('%storyBlock',champions);
    res.writeHead(200,{'Content-Type': 'text/html'});
    res.end(html);
}
function getStory(res){
    fs.readFile('./champions',function (err, data) {
        if (err) return hadError(err,res);
        var champions = data.toString();
        //JSON.parse(data);
        getChampion(champions,res);
    })
}
function hadError(err, res) {
    console.error(err);
    res.end('server error')
}

