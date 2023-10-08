const newsData = require("../db/news-db.json");
const userData = require("../db/user-db.json");
const { filterData } = require("../helpers/filterData");

/**
 * 
 * @param {newsId} id 
 * @returns arrayOf(news)
 */
function getNews(id) {
  return filterData(id, 3);
}

/**
 * Get the read news by the user
 * @param {userId} userId 
 * @returns [news]]
 */
function getReadNews(userId) {
  let user = filterData(userId, 1);
  let readNews = [];
  user[0].read_articles.forEach((element) => {
    console.log("ele", filterData(element, 3)[0]);
    readNews.push(filterData(element, 3)[0]);
  });
  return readNews;
}

/**
 * Get the favorite news by the user
 * @param {userId} userId 
 * @returns [news]
 */
function getFavNews(userId) {
  let user = filterData(userId, 1);
  let favNews = [];
  user[0].favorite_news.forEach((element) => {
    console.log("ele", element);
    favNews.push(filterData(element, 3)[0]);
  });
  return favNews;
}

function getPreferredNews(userId) {
  let user = filterData(userId, 1);
  let preferences = [];
  user[0].preferences.forEach((element) => {
    
  });
  return favNews;
}

module.exports = { getNews, getReadNews, getFavNews, getPreferredNews };
