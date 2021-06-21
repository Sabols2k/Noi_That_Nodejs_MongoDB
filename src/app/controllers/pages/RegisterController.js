const admins = require("../../models/Admin");
const products = require("../../models/Product");
const {
  mongooseToObject,
  mutipleMongooseToObject,
} = require("../../../util/mongoose");
const bcrypt = require("bcryptjs");

const crypto = require("crypto");

class RegisterController {

  index(req, res, next) {
    
    res.render("register");
  }

  // }
  async register(req, res, next) {
    // console.log(req.session)
    try {
      console.log(req.body)
      var user = await admins.findOne({ username: req.body.username });
      // user = mongooseToObject(user)
      console.log(user)
      console.log(req.body)
      console.log(user.password === req.body.password)

      if (!user || req.body.password != user.password) {
        res.send({ status: false, msg: "Login failed1 :(" })
      } else {
        req.session.adminloggedIn = true;
        req.session.adminId = user._id;
        res.redirect('/admin')

        console.log(req.session)
      }
    } catch (err) {
      res.send({ status: false, msg: "Login failed2 :(" });
      console.log(err);
      next();
    }
  }

}

module.exports = new RegisterController();

// const courseController = require('./CourseController');
