const express = require("express");
const user = express.Router();
const getNewToken = require("../services/RefreshToken");
const Logout = require("../services/Logout");
const createUser = require("../services/CreateUser");
const login = require("../services/Login");
const savePost = require("../services/SavePost");
const { validateToken } = require("../Middlewares");
const removeFromSaved = require("../services/RemoveFromSaved");
const getUserNotifications = require("../services/GetNotifications");
const updateNotifications = require("../services/UpdateNotifications");

user.post("/create", (req, res) => {
  try {
    createUser(req, res);
  } catch (error) {
    console.log(error);
    res.send(error.message).status(500);
  }
});

user.post("/login", (req, res) => {
  try {
    login(req, res);
  } catch (error) {
    console.log(error);
    res.send(error.message).status(500);
  }
});

user.post("/refreshToken", (req, res) => {
  try {
    getNewToken(req, res);
  } catch (error) {
    res.send(error.message).status(500);
  }
});

user.post("/logout", (req, res) => {
  try {
    Logout(req, res);
  } catch (error) {
    res.send(error.message).status(500);
  }
});

user.post("/save", validateToken, (req, res) => {
  try {
    savePost(req, res);
  } catch (error) {
    res.send(error.message).status(500);
  }
});
user.patch("/removeFromSaved", validateToken, (req, res) => {
  try {
    removeFromSaved(req, res);
  } catch (error) {
    res.send(error.message).status(500);
  }
});
user.get("/getNotifications", validateToken, (req, res) => {
  try {
    getUserNotifications(req, res);
  } catch (error) {
    res.send(error.message).status(500);
  }
});

user.patch("/updateNotification", validateToken, (req, res) => {
  try {
    updateNotifications(req, res);
  } catch (error) {
    console.log(error);
    res.send(error.message).status(500);
  }
});

module.exports = user;
