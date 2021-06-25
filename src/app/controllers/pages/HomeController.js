const products = require('../../models/Product');
const {mongooseToObject,mutipleMongooseToObject,checkLoginForOption } = require('../../../util/mongoose');

class HomeController {

  index(req, res, next) {
    var lst = checkLoginForOption(req.session)

    res.render('home',{
      loginAccount: lst[0],
      registerLogout: lst[1]
    });
  }
  notfoud(req, res, next){
      res.render('404notfound');
  }
 

}

module.exports = new HomeController();

// const courseController = require('./CourseController');
