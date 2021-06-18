const admins = require("../../models/Admin");
const products = require("../../models/Product");
const { mongooseToObject } = require("../../../util/mongoose");
const { mutipleMongooseToObject } = require("../../../util/mongoose");
const bcrypt = require("bcryptjs");


const crypto = require("crypto");



class AdminLoginController {
  
  index(req, res, next) {
    // res.send("this is page login");
    if (req.session.userId) {
        // res.render("products/stored-products");
        res.redirect("/admin");
      } else {
        res.render("admins/login");
      }
  }

  // }
  async login(req, res, next) {
    try {
        console.log(req.body)
        const user = await admins.findOne({ username: req.body.username  })
        // console.log(user);
        if (!user || !bcrypt.compareSync(req.body.password, user.passwordHash)) {
          res.send({ status: false, msg: 'Login failed1 :(' })
        } else {
            req.session.loggedIn = true
            req.session.userId = user.id
            res.send({ status: true })
        }
    } catch (err) {
        res.send({ status: false, msg: 'Login failed2 :(' })
        console.log(err)
        next()
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
