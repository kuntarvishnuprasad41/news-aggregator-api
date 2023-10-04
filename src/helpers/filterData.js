const userData = require('../db/user-db.json');

function filterData(user_id,type){
    switch(type){
       case 1 : return userData.users.filter((data)=> data.user_id === user_id);  
       case 2 : return userData.users.filter((data)=> data.user_id != user_id);
       default : return null
    }
    
}


module.exports = { filterData };