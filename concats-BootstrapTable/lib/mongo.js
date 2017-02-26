var mongoose = require('mongoose');
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

var ContactSchema = mongoose.Schema({
    ModID: String,
    Module: [String],
    People: [String],
    Leader: String,
    UpdateTime:{type:Date,default:Date.now},
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
    checkRepeatModule();
    function checkRepeatModule(){
        ContactModel.find({ModID : newContact.ModID}, function (err, Modules){
            if (err) {
                return console.error(err);
            }else if(Modules.length){
                console.log('already has' + Modules);
                result = 'already has Module ' + newContact.Module;
                callback(err, result);
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
    var newData = {$set:{People:newPeople.value}};
    ContactModel.update(oldValue,newData,function(err,result){
        if(err){
            console.log(err);
        }else{
            console.log("update");
        }
    });
}


// exports.delete = function (req, res, next) {
//     var id = req.params.id;
//     db.delete(id, function (err) {
//         if (err) {
//             return next(err);
//         }
//         res.redirect('/');
//     });
// };