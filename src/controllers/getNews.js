const express = require("express");
const newsRoutes = require("express").Router();
const fetchUrl = require("../helpers/fetchUrl");
const { newsFromJSON } = require("../models/newsModel");
const { writeToFile } = require("../helpers/fileOperations");
const { readNews, markNewsFavorite } = require("../helpers/updateUser");
const { getReadNews, getFavNews } = require("../helpers/retrievenewsFromFile");
const newsData = require("../db/news-db.json");
const URL = "https://newsapi.org/v2/";

const fetchNews = async (req, res) => {
    console.log("Fetching ...");
    let payload = {
      page: 1,
      pageSize : 50,
      q: "india",
      apiKey: process.env.NEWS_API_KEY,
    };
    let url = new URLSearchParams(payload);
    console.log(`${URL}everything?${url}`);
    try {
      let news = await fetchUrl(`${URL}everything?${url}`);
      let addNews = newsFromJSON(news.articles);
      let allNews = new Object();
      allNews.news = addNews;
      writeToFile(allNews, "news");
      console.log(news)
    } catch {
     console.log("something wrong");
    }
  }

module.exports = fetchNews