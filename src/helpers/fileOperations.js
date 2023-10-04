const users = require('../db/user.json');
const fs = require('fs');
const path = require('path');

function writeToFile(newData){
    let writePath = path.join(__dirname,'../db','/user.json');
    let status = fs.writeFile(writePath,JSON.stringify(newData),{encoding:"utf-8",flag:"w"},(err, data) => {
        return !(err);
    });

    return !(status);
}

module.exports = writeToFile