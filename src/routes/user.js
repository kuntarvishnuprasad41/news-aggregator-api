const express = require('express');
const userRoutes = require("express").Router();
const userData = require('../db/user-db.json');
const writeToFile = require('../helpers/fileOperations');
const {userFromJSON} = require('../models/userModel');
const {filterData} = require('../helpers/filterData');

userRoutes.use(express.json());;
userRoutes.use(express.urlencoded({extended:true}));


userRoutes.get('/',(req,res)=>{
    res.status(200).json(userData);
});

userRoutes.post('/register',(req,res)=>{
    let addUser = userFromJSON(req.body);
    userData.users.push(addUser);
    writeToFile(userData,"user");
    res.status(200).send(addUser)
});

userRoutes.get('/preferences/:id',(req,res)=>{
    let user = filterData(req.params.id,1)
    res.status(200).send(user[0].user_preferences);
});

userRoutes.put('/preferences/:id',(req,res)=>{
    let userToUpdate = filterData(req.params.id,1);
    userToUpdate[0].user_preferences = req.body.news_preferences;



    userData.users = filterData(req.params.id,2);
    userData.users.push(userToUpdate[0]);

    // users.user.push(userFromJSON(userToUpdate[0]))
    // users.user.push(userData);
    console.log(userData);

    writeToFile(userData,"user");
    res.status(200).send(userData);
})

userRoutes.post('/login',(req,res)=>{

});



module.exports = userRoutes