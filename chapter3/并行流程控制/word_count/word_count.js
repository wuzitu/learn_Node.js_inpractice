var fs = require('fs');
var completedTasks = 0;
var tasks = [];
var wordCounts = {};
var filesDir = './text';

function checkIfComplete(){
    completedTasks++;
    if(completedTasks == tasks.length){
        //当所有任务全部完成后，列出文件中用到的每个单词及用了多少次。
        for(var index in wordCounts){
            console.log(index +':' + wordCounts[index]);
        }
    }
}

function countWordsInText(text){
    var words = text
        .toString()
        .toLowerCase()
        .split(/\W+/)
        .sort();
    for(var index in words){
        var word = words[index];
        //对文本单词计数。
        if (word) {
            wordCounts[word] = 
                (wordCounts[word])? wordCounts[word] + 1 : 1;
                //console.log(word,wordCounts[word]);
        }
    }
}
//得到text目录中的文件列表。
fs.readdir(filesDir, function(err,files){
    if(err) throw err;
    //定义处理每个文件的任务。每个任务中都会调用一个异步读取文件的函数并对文件中使用的单词计数。
    for(var index in files){
        var task = (function(file){
            return function(){
                fs.readFile(file, function(err, text){
                    if(err) throw err;
                    countWordsInText(text);
                    checkIfComplete();
                });
            }
        })(filesDir + '/' + files[index]);
        //把所有任务添加到函数调用数组中。
        tasks.push(task);
    }
    //开始并执行所有任务。
    for(var task in tasks){
        tasks[task]();
    }
});

