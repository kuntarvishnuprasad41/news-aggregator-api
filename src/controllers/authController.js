const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userData = require("../db/user-db.json");
const { writeToFile } = require("../helpers/fileOperations");

const { userFromJSON } = require("../models/userModel");
const { filterData } = require("../helpers/filterData");

let register = (req, res) => {
  let addUser = userFromJSON(req.body);
  if (addUser.status) {
    userData.users.push(addUser.user);
    let result = writeToFile(userData, "user");
    if (result.status) {
      return res.status(200).send(addUser);
    } else {
      return res
        .status(400)
        .send(result.message);
    }
  } else {
    return res.status(500).send(addUser.message);
  }
};

let login = (req, res) => {
  let userMail = req.body.user_email;
  let passedPassword = req.body.password;
  let user = filterData(userMail, 4);
  if (user[0] != null) {
    let isValidPassword = bcrypt.compareSync(passedPassword, user[0].password);

    if (isValidPassword) {
      let token = jwt.sign(
        {
          id: user.id,
        },
        process.env.API_SECRET,
        {
          expiresIn: 86400,
        }
      );
      return res.status(200).send({
        message: "Login Successful",
        accessToken: token,
      });
    } else {
      return res.status(404).send({ message: "wrong password" });
    }
  } else {
    return res.status(404).send({ message: "user not found" });
  }
};

module.exports = { register, login };
