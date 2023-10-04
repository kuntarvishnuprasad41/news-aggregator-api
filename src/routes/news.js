const express = require('express');
const newsRoutes = require('express').Router();
const fetchUrl = require('../helpers/fetchUrl');
const { newsFromJSON } = require('../models/newsModel');
const newsData = require('../db/news-db.json');
const writeToFile = require('../helpers/fileOperations');


const URL = "https://newsapi.org/v2/"

// everything

// page=1&q=india&apiKey=6bbd8d57fd2d44afab6c1b383878f85e

newsRoutes.get('/',async (req,res)=>{
    try{
        let news = await(fetchUrl(URL));
        let addNews = newsFromJSON(news.articles);
        let allNews = new Object();
        allNews.news = newsData.news.concat(addNews)
        writeToFile(allNews,"news");        
        res.status(200).send(news);
    }catch{
        res.status(500).send("Something went wrong");
    }
});


newsRoutes.get('/:category',async(req,res)=>{
    let payload = {
            page:1,
            category:req.params.category,
            apiKey:process.env.NEWS_API_KEY
            }
    let url = new URLSearchParams(payload);
    console.log(url);
    console.log(`URL ${URL}top-headlines?${url}`);
    try{


        res.status(200).send(await fetchUrl(`${URL}top-headlines?${url}`))
        // console.log(`${URL}?${url}`);
    }catch(err){
        res.status(400).send("Something went wrong");
    }

})

newsRoutes.get('/categories',(req,res)=>{
    res.status(200).send({categories:["business","entertainment","general","health","science","sports","technology"]})
})

module.exports = newsRoutes;
