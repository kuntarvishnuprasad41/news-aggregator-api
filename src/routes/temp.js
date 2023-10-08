const express = require("express");
const tempRoutes = require("express").Router();
const fetchUrl = require("../helpers/fetchUrl");
const { newsFromJSON } = require("../models/newsModel");
const { writeToFile } = require("../helpers/fileOperations");
const { readNews, markNewsFavorite } = require("../helpers/updateUser");
const { getReadNews, getFavNews } = require("../helpers/retrievenewsFromFile");
const newsData = require("../db/news-db.json");
const verifytoken = require("../middlewares/authJWS");

tempRoutes.use(express.json());
tempRoutes.use(express.urlencoded({ extended: true }));




const URL = "https://newsapi.org/v2/";

tempRoutes.get("/", async (req, res) => {
  let payload = {
    page: 1,
    q: "india",
    apiKey: process.env.NEWS_API_KEY,
  };
  let url = new URLSearchParams(payload);
  try {
    let news = await fetchUrl(`${URL}everything?${url}`);
    let addNews = newsFromJSON(news.articles);
    let allNews = new Object();
    allNews.news = addNews;
    writeToFile(allNews, "news");
    res.status(200).send(news);
  } catch {
    res.status(500).send("Something went wrong");
  }
});

tempRoutes.get("/search/:keyword", verifytoken, async (req, res) => {
  if (req.user) {
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
  } else {
    return res.status(403).send({
      message: req.message,
    });
  }
});

tempRoutes.get("/category/:category", async (req, res) => {
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

tempRoutes.get("/categories", (req, res) => {
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

tempRoutes.get("/read", (req, res) => {
  let readNews = getReadNews(req.query.id);
  console.log(readNews[0]);
  res.status(200).send(readNews);
});

tempRoutes.get("/favorite", (req, res) => {
  let readNews = getFavNews(req.query.id);
  res.status(200).send(readNews);
});

tempRoutes.post("/:id/read", (req, res) => {
  let result = readNews(req.body.user_id, req.params.id);
  console.log(result.status);
  if (result.status) {
    res.status(200).send({ message: "user updated successfully" });
  } else {
    res.status(400).send({ message: result.message });
  }
});

tempRoutes.post("/:id/favorite", (req, res) => {
  let result = markNewsFavorite(req.body.user_id, req.params.id);
  console.log(result.status);
  if (result.status) {
    res.status(200).send({ message: "user updated successfully" });
  } else {
    res.status(400).send({ message: result.message });
  }
});

module.exports = tempRoutes;
