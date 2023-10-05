const jwt = require("jsonwebtoken");
const { filterData } = require('../helpers/filterData');

const verifyToken = (req,res,next)=>{
    if(req.headers && req.headers.authorization) {
        jwt.verify(req.headers.authorization, process.env.API_SECRET, function(err, decode) {
            if(err) {
                req.user = undefined;
                req.message = "Header verification failed";
                next();
            }else{
                let user = filterData(req.body.user_email,4);
                if(user!=null){
                    req.user = user;
                    req.message = "Found Successfully";
                    next();
                }else{
                    req.user = undefined;
                    req.message = "Some error while finding the user";
                    next();
                }
            }
        });
    }else {
        console.log("err");
        req.user = undefined;
        req.message = "Authorization header not found";
        next();
    }
};

module.exports = verifyToken;