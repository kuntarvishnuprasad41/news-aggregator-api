const express = require("express");
const newsRoutes = require("express").Router();
const fetchUrl = require("../helpers/fetchUrl");
const { newsFromJSON } = require("../models/newsModel");
const { readNews, markNewsFavorite } = require("../helpers/updateUser");
const { getReadNews, getFavNews } = require("../helpers/retrievenewsFromFile");
const newsData = require("../db/news-db.json");

newsRoutes.use(express.json());
newsRoutes.use(express.urlencoded({ extended: true }));
const URL = "https://newsapi.org/v2/";


/**
 * Get all news, No need to login 
 * Method : Get
 * Endpoint : /api/news/open
 */
newsRoutes.get("/open", (req,res)=>{
  res.status(200).send(newsData)
});


/**
 * 
 */

/**
 * Search a news
 * method: GET
 * Endpoint :/api/news/search/keyword to search
 */
newsRoutes.get("/search/:keyword", async (req, res) => {
    let payload = {
      page: 1,
      q: req.params.keyword,
      apiKey: process.env.NEWS_API_KEY,
    };
    let url = new URLSearchParams(payload);
    try {
      let news = await fetchUrl(`${URL}everything?${url}`);
      res.status(200).send(newsFromJSON(news.articles));
    } catch {
      res.status(500).send("Something went wrong");
    }
});

/**
 * list all news by category
 * method: GET
 * Endpoint :/api/news/search/keyword to search
 */
newsRoutes.get("/category/:category", async (req, res) => {
  let payload = {
    page: 1,
    category: req.params.category,
    apiKey: process.env.NEWS_API_KEY,
  };
  let url = new URLSearchParams(payload);
  console.log(url);
  console.log(`URL ${URL}top-headlines?${url}`);
  try {
    res.status(200).send(await fetchUrl(`${URL}top-headlines?${url}`));
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

/**
 * List of all categories available
 * method: GET
 * Endpoint :/api/news/categories
 */
newsRoutes.get("/categories", (req, res) => {
  res
    .status(200)
    .send({
      categories: [
        "business",
        "entertainment",
        "general",
        "health",
        "science",
        "sports",
        "technology",
      ],
    });
});


/**
 * Get read news by userid
 * pass query params userID
 */
newsRoutes.get("/read", (req, res) => {
  let readNews = getReadNews(req.query.id);
  console.log(readNews[0]);
  res.status(200).send(readNews);
});

/**
 * Get favorite news by userid
 * pass query params userID
 */
newsRoutes.get("/favorite", (req, res) => {
  let readNews = getFavNews(req.query.id);
  res.status(200).send(readNews);
});

/**
 * Mark news as read
 * pass userId in request body
 * pass newsId in request param
 */
newsRoutes.post("/:id/read", (req, res) => {
  let result = readNews(req.body.user_id, req.params.id);
  console.log(result.status);
  if (result.status) {
    res.status(200).send({ message: "user updated successfully" });
  } else {
    res.status(400).send({ message: result.message });
  }
});


/**
 * Mark news as favorite
 * pass userId in request body
 * pass newsId in request param
 */
newsRoutes.post("/:id/favorite", (req, res) => {
  let result = markNewsFavorite(req.body.user_id, req.params.id);
  console.log(result.status);
  if (result.status) {
    res.status(200).send({ message: "user updated successfully" });
  } else {
    res.status(400).send({ message: result.message });
  }
});

module.exports = newsRoutes;
