const products = require('../../models/Product');
const {mongooseToObject} = require('../../../util/mongoose');
const {mutipleMongooseToObject} = require('../../../util/mongoose');

class HomeController {

  index(req, res, next) {
    res.render('home');
  }
  notfoud(req, res, next){
      res.render('404notfound');
  }
 

}

module.exports = new HomeController();

// const courseController = require('./CourseController');
