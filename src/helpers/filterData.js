const userData = require('../db/user-db.json');
const newsData = require('../db/news-db.json');

function filterData(id,type){
    switch(type){
       case 1 : return userData.users.filter((data)=> data.user_id === id);  
       case 2 : return userData.users.filter((data)=> data.user_id != id);
       case 3 : return newsData.news.filter((data)=> data.news_id === id);
       case 4 : return userData.users.filter((data)=> data.user_email == id);

       default : return null
    }
    
}


module.exports = { filterData };