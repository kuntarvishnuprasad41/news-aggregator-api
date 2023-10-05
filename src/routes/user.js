const express = require("express");
const userRoutes = require("express").Router();
const userData = require("../db/user-db.json");
const { filterData } = require("../helpers/filterData");
const { updateNewsPreferences } = require("../helpers/updateUser");
const { register, login } = require("../controllers/authController");

userRoutes.use(express.json());
userRoutes.use(express.urlencoded({ extended: true }));

userRoutes.get("/", (req, res) => {
  res.status(200).json(userData);
});

userRoutes.post("/register", register);
userRoutes.post("/login", login);

userRoutes.get("/preferences/:id", (req, res) => {
  let user = filterData(req.params.id, 1);
  res.status(200).send(user[0].user_preferences);
});

userRoutes.put("/preferences/:id", (req, res) => {
  console.log(req.body.news_preferences);
  let result = updateNewsPreferences(req.params.id, req.body.news_preferences);

  if (result.status) {
    res.status(200).send(userData);
  } else {
    res.status(400).send({ message: result.message });
  }
});

userRoutes.post("/login", (req, res) => {});

module.exports = userRoutes;
