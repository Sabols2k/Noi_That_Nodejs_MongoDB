const admins = require("../../models/Admin");
const products = require("../../models/Product");
const {mongooseToObject,mutipleMongooseToObject,checkLoginForOption } = require('../../../util/mongoose');

const bcrypt = require("bcryptjs");


const crypto = require("crypto");



class AdminLogoutController {
  
  index(req, res, next) {
   
    req.session.loggedIn = false
    res.redirect("/")
  }

}

module.exports = new AdminLogoutController();

// const courseController = require('./CourseController');
