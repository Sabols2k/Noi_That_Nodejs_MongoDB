const products = require('../../models/Product');
const {mongooseToObject} = require('../../../util/mongoose');
const {mutipleMongooseToObject} = require('../../../util/mongoose');

class CheckoutController {

  index(req, res, next) {
    res.render('checkout');
  }
  notfoud(req, res, next){
    res.send(404);
}

 

}

module.exports = new CheckoutController();

// const courseController = require('./CourseController');
