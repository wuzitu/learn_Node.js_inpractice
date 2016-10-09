/**
 * Created by Administrator on 2016/10/9.
 */
var flow = require('nimble');
flow.series([
    function (callback) {
        setTimeout(function () {
            console.log('i excute first.');
            callback();
        }, 1000);
    },
    function (callback) {
        setTimeout(function () {
            console.log('i excute next.');
            callback();
        }, 500);
    },
    function (callback) {
        setTimeout(function () {
            console.log('i excute last.');
            callback();
        }, 100);
    }
]);

