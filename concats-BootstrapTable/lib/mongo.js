var mongoose = require('mongoose');
var moment = require('moment')
// mongoose.connect('mongodb://localhost:27017/test');
mongoose.Promise = global.Promise;
var dburl = 'localhost:27017/test';

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("connect db success");
});

exports.connect = function(callback) {
    mongoose.connect(dburl);
}

exports.disconnect = function(callback) {
    mongoose.disconnect(callback);
}
// var timeNow = moment().format('L');
var ContactSchema = mongoose.Schema({
    ModID: String,
    Module: [String],
    People: [String],
    Leader: String,
    UpdateTime:{type:String,default:moment().format('YYYY-MM-DD')},
    finished:{type:Boolean, default:false}
});

var ContactModel = mongoose.model('Contact',ContactSchema);
// var Contact = new ContactModel('Contact',ContactSchema)

exports.addModule = function(ele,callback) {
    var newContact = new ContactModel();
    var result;
    newContact.Module = ele.Module;
    newContact.People = ele.People;
    newContact.Leader = ele.Leader;
    newContact.ModID = ele.ModID;
    checkRepeatModule();
    function checkRepeatModule(){
        ContactModel.find({Module : newContact.Module}, function (err, Modules){
            if (err) {
                return console.error(err);
            }else if(Modules.length){
                console.log('already has' + Modules.Module);
                callback(err, 'repeat');
            }else{
                doModuleSave()
            }
        });
    }
    function doModuleSave(){
        newContact.save(function(err){
            if(err){
                console.log("FATAL"+err);
                result = false;
                callback(err);
            }else{
                result = true;
                console.log("save success");
                callback(err, result);
            }
        });
    }
    
}

exports.addPeople = function(newPeople,callback) {
    var oldValue  = {ModID:newPeople.ModID};
    var newData = {$push:{People:newPeople.value}};
    ContactModel.find(newData.$push, function (err, PeopleDB){
        if (err) {
            return console.error(err);
        }else if(PeopleDB.length){
            console.log('already has' + PeopleDB);
            callback(err, 'repeat');
        }else{
            doAddpeople();
        }
    });
    function doAddpeople(){
        ContactModel.update(oldValue,newData,function(err,result){
            if(err){
                console.log(err);
                callback(err);
            }else{
                console.log("update");
                callback(err, "OK");
            }
        });
    }
    
}

exports.delModule = function(row, callback){
    ContactModel.remove(row, function(err, result){
        if(err){
            console.log(err);
            callback(err,false);
        }else if(result.result.n == 0){
            callback(err,false);
        }else{
            console.log("delOK");
            callback(err,true);
        }
    });
}

exports.loadAll = function(row, callback){
    ContactModel.find({}, function(err, result){
        if(err){
            console.log(err);
            callback(err,"err");
        }else if(result.length == 0){
            callback(err,"empty");
        }else{
            console.log("refreshOK");
            callback(err,result);
        }
    });
}
