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
    }
    db.addModule(newContact, function (err, result) {
        if (err) {
            return err;
        }else if(Object.prototype.toString.call(result) === "[object String]"){//result is String
          res.writeHead(200, {"Content-Type": "Text"});
          res.end(result);
        }else if(result){//save success
          res.writeHead(200, {"Content-Type": "application/json"});
          res.end(JSON.stringify([newContact]));
        }else{//save failed
          res.writeHead(200, {"Content-Type": "Text"});
           res.end("addModule failed");
        }
    });

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
    }
    db.addPeople(newPeople, function(err, result){
      
    });


});


module.exports = router;