var http = require("http"),
    url = require('url'),
    superagent = require('superagent'),
    cheerio = require('cheerio'),
    async = require('async'),
    eventproxy = require('eventproxy'),
    fs = require('fs');
var path = require('path');
var file = path.join(process.cwd(), '/.txt')
var connect = require('connect');
var ep = new eventproxy();
var champions = [];
var server = http.createServer(function(req, res){
    champions = [];
    getchampionPreview(res);
    
    
});

function getchampionPreview(res){
    var duowanUrl = "http://lol.duowan.com/hero/";
    superagent.get(duowanUrl)
        .end(function(err,sres){
            if(!sres) getchampionPreview(res)
            else{
            var champion = {};
            var champion_bgStorys = {};
            var $ = cheerio.load(sres.text);
            console.log("get preview data complete!");
            champion_list = $("#champion_list").html();
            
            var champion_li = $("#champion_list li");
            
            for (var i=0; i<champion_li.length; i++){
                var Tmp = champion_li.eq(i);
                var Tmp_champion = {
                    "num": i,
                    "name": Tmp.find("div.champion_name").text(),
                    "img": Tmp.find("img.champion_icon").html,
                    "link": Tmp.find("a").attr("href"),
                    "story": ""
                }
                
                getStory(Tmp_champion,champion_li.length);
                
            }
            
            storeChampion(file,champion_list);
            }
        });
}

var arr = [];
function storeChampion(file,champion_list){
    fs.writeFile('championlist', champion_list, function(err){
        if(err) throw err;
        console.log('champion_list Saved.');
    });
}
var count = 0;
function getStory(Tmp_champion,totalNum){
    var link = Tmp_champion.link;
    superagent.get(link)
        .end(function(err, sres){
            if(!sres) getStory(Tmp_champion)
            else{
            var $ = cheerio.load(sres.text);
            var story = $(".hero-popup .hero-popup__bd .hero-popup__txt").text();
            Tmp_champion.story = story;
            champions.push(Tmp_champion);
            console.log("get champion"+ Tmp_champion.num + "ok!");
            count++;
            // arr.push(Tmp_champion.num);
            // arr.sort();
            // console.log(arr.length);
            // console.log(arr);

            // if(champions.length && totalNum == champions.length){
                saveChampion_bg(champions);
            // }
            }
            
        });
}

function saveChampion_bg(champions){
    fs.writeFile('champions', JSON.stringify(champions), function(err){
        if(err) throw err;
        console.log('ALL champions Saved.');
    });
}
server.listen(8001);
