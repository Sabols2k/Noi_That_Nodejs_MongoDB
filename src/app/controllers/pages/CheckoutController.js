const products = require('../../models/Product');
const {mongooseToObject} = require('../../../util/mongoose');
const {mutipleMongooseToObject,checkLoginForOption } = require('../../../util/mongoose');

class CheckoutController {

  index(req, res, next) {
    var lst = checkLoginForOption(req.session)

    res.render('checkout',{
      loginAccount: lst[0],
      registerLogout: lst[1]
    });
  }
  notfoud(req, res, next){
    res.send(404);
  }
  create(req, res, next){
    const data = req.body;
    console.log(data);
  }
}

module.exports = new CheckoutController();

// const courseController = require('./CourseController');
