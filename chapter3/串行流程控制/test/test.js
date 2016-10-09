/**
 * Created by wulei on 2016/10/9.
 */

setTimeout(function () {
    console.log('I excute first');
    setTimeout(function () {
        console.log('I excute 2');
        setTimeout(function () {
            console.log('I excute 3');
        }, 3000);
    }, 2000);
}, 1000);


console.log('I excute 44');


console.log('I excute 55');



