var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../lib/mongo')

router.get('/addModule', function(req, res, next){

    // res.writeHead(200, {"Content-Type": "application/json"});
    res.render('index', { title: '弹窗提交成功。' });
});

//弹窗新增Module
router.post('/addModule', function(req, res){
    var newContact = req.body;
    // console.log(newContact);
    if (Object.keys(newContact).length == 0) {
        return res.render('error');
    } else if(newContact.Leader == "" || newContact.Module == "" || newContact.People == "" || newContact.ModID == ""){
        res.writeHead(200, {"Content-Type": "Text"});
        res.end('empty');
    }else{
        db.addModule(newContact, function (err, result) {
            if (err) {
                return err;
            }else if(Object.prototype.toString.call(result) === "[object String]"){//result is String
                res.writeHead(200, {"Content-Type": "Text"});
                res.end('repeat');
            }else if(result){//save success：result=true
                res.writeHead(200, {"Content-Type": "Text"});
                res.end("ok");
                // res.render('index', { title: '弹窗提交成功。' });
                //JSON.stringify([newContact])
            }else{//save failed
                res.writeHead(200, {"Content-Type": "Text"});
                res.end("addModule failed");
            }
        });
    }
});
router.get('/addPeople', function(req, res, next){
    // res.writeHead(200, {"Content-Type": "application/json"});
    res.render('index', { title: 'addPeople' });
});
router.post('/addPeople', function(req, res, next){
    var newPeople = req.body;
    // console.log(newContact);
    if (Object.keys(newPeople).length == 0) {
        return res.render('error');
    }else{
        db.addPeople(newPeople, function(err, result){
        res.writeHead(200, {"Content-Type": "Text"});
        if(result = "repeat"){
            res.end(result);
        }else{
            res.end('ok');
        }
            
        });
    }
});

router.get('/delModule', function(req, res, next){
    // res.writeHead(200, {"Content-Type": "application/json"});
    res.render('index', { title: 'Contacts' });
});
router.post('/delModule', function(req, res, next){
    var Row = req.body;
    if (Object.keys(Row).length == 0) {
        return res.render('error');
    }else{
        db.delModule(Row, function(err, result){
            res.writeHead(200, {"Content-Type": "application/json"});
                res.end(JSON.stringify({"result":result}));
        });
    }
});

router.get('/contacts', function(req, res, next){
    res.render('index', { title: 'Contacts' });
});
router.post('/contacts',function(req, res, next){
    var Row = req.body;
    if (Object.keys(Row).length == 0) {
        return res.render('error');
    }else{
        db.loadAll(Row, function(err, result){
            if(Object.prototype.toString.call(result) === "[object String]"){//result is String
                res.writeHead(200, {"Content-Type": "Text"});
                res.end(result);
            }else{
                res.writeHead(200, {"Content-Type": "application/json"});
                res.end(JSON.stringify(result));
            }
            
            });
        }
});

module.exports = router;