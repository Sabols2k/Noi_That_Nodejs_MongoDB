const products = require('../../models/Product');
const {mongooseToObject} = require('../../../util/mongoose');
const {mutipleMongooseToObject} = require('../../../util/mongoose');

class HomeController {

  index(req, res, next) {
    res.render('products/show');
  }
  notfoud(req, res, next){
      res.send(404);
  }
 

}

module.exports = new HomeController();

// const courseController = require('./CourseController');
