const products = require('../../models/Product');
const {mongooseToObject} = require('../../../util/mongoose');
const {mutipleMongooseToObject,checkLoginForOption } = require('../../../util/mongoose');

class DetailsanphamController {

  index(req, res, next) {
    console.log(req.params.id)
    var lst = checkLoginForOption(req.session)

    products
      .findById(req.params.id)
      .then((product) =>
        res.render("detail-sanpham", {
          product: mongooseToObject(product),
          loginAccount: lst[0],
          registerLogout: lst[1]
        })
      )
      .catch(next);
  }

  notfoud(req, res, next){
    res.send(404);
  }
}

module.exports = new DetailsanphamController();

// const courseController = require('./CourseController');
