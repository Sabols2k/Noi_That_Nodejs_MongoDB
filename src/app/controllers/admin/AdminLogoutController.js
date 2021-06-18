const admins = require("../../models/Admin");
const products = require("../../models/Product");
const { mongooseToObject } = require("../../../util/mongoose");
const { mutipleMongooseToObject } = require("../../../util/mongoose");
const bcrypt = require("bcryptjs");


const crypto = require("crypto");



class AdminLogoutController {
  
  index(req, res, next) {
    
    if (req.session) {
      // delete session object
      req.session.destroy(function (err) {
        if (err) {
          return next(err);
        } else {
          return res.redirect("/");
        }
      });
    }
  }

}

module.exports = new AdminLogoutController();

// const courseController = require('./CourseController');
