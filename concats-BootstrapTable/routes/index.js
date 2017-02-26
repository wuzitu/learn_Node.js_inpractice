var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Contacts' });
});

router.post('/contacts/Table', function(req, res, next) {
  res.writeHead(200, {"Content-Type": "application/json"});
    var json = JSON.stringify(
    [{
      Module: "module1",
      People: "people1",
      Leader: "leader1",
      ModID: "1"
    },
    {
      Module: "module2",
      People: "people2",
      Leader: "leader2",
      ModID: "2"
    },
    {
      Module: "module3",
      People: "people3;people4",
      Leader: "leader3",
      UpdateTime: "2017.02.19",
      ModID: "3"
    }]
    );
    res.end(json);
});

module.exports = router;
