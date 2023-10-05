const userData = require('../db/user-db.json');
const { filterData } = require('../helpers/filterData');
const { writeToFile } = require('../helpers/fileOperations')

function updateUser(userId,userParams){
    let userToUpdate = filterData(userId,1);
    let keys = Object.keys(userParams);
    
    for(const item in keys) {
       userToUpdate[0][keys[item]] = userParams[keys[item]]
    };

    let usersData = filterData(userId,2);
    usersData.users.push(userToUpdate[0]);
    return writeToFile(userData,"user");
}

function readNews(userId,newsId){
    let userToUpdate = filterData(userId,1);
    
    if(!userToUpdate[0].read_articles.includes(newsId)){
        userToUpdate[0].read_articles.push(newsId);
        userData.users = filterData(userId,2);
        userData.users.push(userToUpdate[0]);
        return writeToFile(userData,"user");
    }
    
    return {
        message : "News already read by user ",
            status : false
       };
}

function markNewsFavorite(userId,newsId){

    let userToUpdate = filterData(userId,1);
    if(!userToUpdate[0].favorite_news.includes(newsId)){
        userToUpdate[0].favorite_news.push(newsId);
        userData.users = filterData(userId,2);
        userData.users.push(userToUpdate[0]);
        return writeToFile(userData,"user");
    }

    return {
        message : "Already Added to Favorites",
            status : false
       };
}

function updateNewsPreferences(userId, newsPreference){
    let userToUpdate = filterData(userId,1);
    
    if(!userToUpdate[0].user_preferences.includes(newsPreference)){

        userToUpdate[0].user_preferences.push(newsPreference);

        userData.users = filterData(userId,2);
        userData.users.push(userToUpdate[0]);

        return writeToFile(userData,"user");
    }

    return {
        message : "Preference already exists",
        status : false
       };
}

module.exports = { updateUser, readNews, updateNewsPreferences, markNewsFavorite};