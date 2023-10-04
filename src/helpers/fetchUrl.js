const axios = require('axios');

function fetchUrl(url){
    return new Promise( (resolve,reject)=>{
        axios.get(url).then((result) => {
            return resolve(result.data);
        }).catch((err) => {
            return reject(err);
        });
    } );
}

module.exports = fetchUrl;