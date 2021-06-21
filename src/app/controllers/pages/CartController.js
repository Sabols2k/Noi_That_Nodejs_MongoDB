const products = require('../../models/Product');
const {mongooseToObject} = require('../../../util/mongoose');
const {mutipleMongooseToObject} = require('../../../util/mongoose');

class CartController {

  index(req, res, next) {
    res.render('cart');
  }
  notfoud(req, res, next){
    res.send(404);
}

 

}

module.exports = new CartController();

// const courseController = require('./CourseController');
