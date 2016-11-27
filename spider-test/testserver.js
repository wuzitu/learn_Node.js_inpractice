var http = require("http"),
    url = require('url'),
    superagent = require('superagent'),
    cheerio = require('cheerio'),
    async = require('async'),
    eventproxy = require('eventproxy'),
    fs = require('fs');
var path = require('path');
var file = "test.txt";
var shows = "";
var server = http.createServer(function(req, res){
    // var content = "111111111";
    // fs.writeFile('test.txt', JSON.stringify(content), function(err){
    //     if(err) throw err;
    //     console.log('Saved.');
    // });
    getshow(file,res)


});
function getshow(file, res){
    fs.exists('test.txt',function(exists,res){
        fs.readFileSync(file, 'utf8', function(err, data,res){
            var data = data.toString();
            shows = data;
            console.log(data);
        });
    res.end(shows);
    });
}
// function show(file,res){

//         res.end(shows);
//     });
// }
server.listen(8001);