const newsData = require('../db/news-db.json');
const userData = require('../db/user-db.json');
const { filterData } = require('../helpers/filterData');

function getNews(id){
    return filterData(id,3)
}

function getReadNews(userId){
    let user = filterData(userId,1);
    let readNews = [];

    user[0].read_articles.forEach(element => {
        console.log("ele",element);
        readNews.push(filterData(element,3)[0]);
    });

    return readNews;
}

function getFavNews(userId){
    let user = filterData(userId,1);
    let favNews = [];

    user[0].favorite_news.forEach(element => {
        console.log("ele",element);
        favNews.push(filterData(element,3)[0]);
    });

    return favNews;
}

module.exports = { getNews , getReadNews, getFavNews };