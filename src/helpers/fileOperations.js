const fs = require('fs');
const path = require('path');

function writeToFile(newData,type){
    let writePath = path.join(__dirname,'../db',`/${type}-db.json`);
    // console.log(writePath)
    let status = fs.writeFile(writePath,JSON.stringify(newData),{encoding:"utf-8",flag:"w"},(err, data) => {
        return !(err);
    });

    return {
        status : !(status)
    };
}

function addNews(newData){
    
}

module.exports = { writeToFile }