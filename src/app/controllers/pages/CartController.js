const products = require('../../models/Product');
const {mongooseToObject} = require('../../../util/mongoose');
const {mutipleMongooseToObject,checkLoginForOption } = require('../../../util/mongoose');

class CartController {

  index(req, res, next) {
    var lst = checkLoginForOption(req.session)

    res.render('cart',{
      loginAccount: lst[0],
      registerLogout: lst[1]
    });
  }
  notfoud(req, res, next){
    res.send(404);
}

 

}

module.exports = new CartController();

// const courseController = require('./CourseController');
