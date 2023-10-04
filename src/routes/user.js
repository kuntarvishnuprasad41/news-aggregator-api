const express = require('express');
const userRoutes = require("express").Router();
const users = require('../db/user.json');
const writeToFile = require('../helpers/fileOperations');
const { v4: uuidv4 } = require('uuid');
const timestamp = require('time-stamp');
const {User, userFromJSON} = require('../models/userModel');

userRoutes.use(express.json());;
userRoutes.use(express.urlencoded({extended:true}));


userRoutes.get('/',(req,res)=>{
    res.status(200).json(users);
});

userRoutes.post('/register',(req,res)=>{
    
    

    let addUser = userFromJSON(req.body);
    console.log(addUser);
    
    res.status(200).send(addUser)
})



module.exports = userRoutes