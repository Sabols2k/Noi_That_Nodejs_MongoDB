const admins = require("../../models/Admin");
const products = require("../../models/Product");
const { mongooseToObject } = require("../../../util/mongoose");
const { mutipleMongooseToObject } = require("../../../util/mongoose");
const bcrypt = require("bcryptjs");


const crypto = require("crypto");



class LogoutController {
  
  index(req, res, next) {
    req.session.loggedIn = false
    res.redirect("/")
  }

}

module.exports = new LogoutController();

// const courseController = require('./CourseController');
