const admins = require("../../models/Admin");
const products = require("../../models/Product");
const {
  mongooseToObject,
  mutipleMongooseToObject,
} = require("../../../util/mongoose");
const bcrypt = require("bcryptjs");

const crypto = require("crypto");

class AdminLoginController {

  async index(req, res, next) {
    console.log(req.session)
    // const user = await admins.findOne({ username: "chaudd" });
    res.render("admins/login", { layout: false });
  }

  // }
  async login(req, res, next) {
    console.log(req.session)
    try {
      console.log(req.body)
      var user = await admins.findOne({ email: req.body.email });
      // user = mongooseToObject(user)
      console.log(user)
      console.log(req.body)
      console.log(user.password === req.body.password)

      if (!user || req.body.password != user.password) {
        res.send({ status: false, msg: "Login failed1 :(" })
      } else {
        req.session.adminloggedIn = true;
        req.session.adminId = user._id;
        res.redirect('/admin-dashboard')

        console.log(req.session)
      }
    } catch (err) {
      res.send({ status: false, msg: "Login failed2 :(" });
      console.log(err);
      next();
    }
  }

  logout(req, res, next) {
    console.log("logout");
    console.log(req.session);
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

module.exports = new AdminLoginController();

// const courseController = require('./CourseController');
