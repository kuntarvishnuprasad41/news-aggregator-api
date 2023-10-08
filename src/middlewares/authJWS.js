const jwt = require("jsonwebtoken");
const { filterData } = require("../helpers/filterData");

/**
 * To verify the header
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const verifyToken = (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    jwt.verify(
      req.headers.authorization,
      process.env.API_SECRET,
      function (err, decode) {
        if (err) {
          req.user = undefined;
          req.message = "Header verification failed";
          next();
        } else {
          let user = filterData(req.body.user_email, 4);
          if (user != null) {
            req.user = user;
            req.message = "Found Successfully";
            next();
          } else {
            req.user = undefined;
            req.message = "Some error while finding the user";
            next();
          }
        }
      }
    );
  } else if ( req.path == '/') return next(); else{
    res.status(500).send({message:req.message})
  }
};

module.exports = verifyToken;
