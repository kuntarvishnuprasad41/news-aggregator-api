const express = require('express');
const userRoutes = require("express").Router();
const userData = require('../db/user-db.json');
const { writeToFile } = require('../helpers/fileOperations');
const {userFromJSON} = require('../models/userModel');
const {filterData} = require('../helpers/filterData');
const { updateNewsPreferences } = require('../helpers/updateUser')


userRoutes.use(express.json());;
userRoutes.use(express.urlencoded({extended:true}));


userRoutes.get('/',(req,res)=>{
    res.status(200).json(userData);
});

userRoutes.post('/register',(req,res)=>{
    let addUser = userFromJSON(req.body);
    userData.users.push(addUser);
    let result = writeToFile(userData,"user");
    if(result.status){
        res.status(200).send(addUser)
    }else{
        res.status(400).send({message:"Something went wrong while adding user"})
    }

});

userRoutes.get('/preferences/:id',(req,res)=>{
    let user = filterData(req.params.id,1)
    res.status(200).send(user[0].user_preferences);
});

userRoutes.put('/preferences/:id',(req,res)=>{


    console.log(req.body.news_preferences);
    let result = updateNewsPreferences(req.params.id,req.body.news_preferences)

    if(result.status){
        res.status(200).send(userData);
    }else{
        res.status(400).send({message:result.message});
    }

});



userRoutes.post('/login',(req,res)=>{

});



module.exports = userRoutes