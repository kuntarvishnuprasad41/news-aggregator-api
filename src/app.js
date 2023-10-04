const express = require('express');
const routes = require('express').Router();
const dotenv = require('dotenv').config();
const app = express();
const userRoutes = require('./routes/user')
const newsRoutes = require('./routes/news')

let port = process.env.PORT;








app.use(routes);



routes.use('/user',userRoutes);
routes.use('/news',newsRoutes);


app.get('/',(req,res)=>{
    res.status(200).send("Hi")
})
app.listen(port, (err)=>{
    if(err){
        console.log("Something went wrong");
    }else{
        console.log("Successfully running at : "+port);
    }
});