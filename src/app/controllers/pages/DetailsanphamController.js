const products = require('../../models/Product');
const {mongooseToObject} = require('../../../util/mongoose');
const {mutipleMongooseToObject} = require('../../../util/mongoose');

class DetailsanphamController {

  index(req, res, next) {
    console.log(req.params.id)
    products
      .findById(req.params.id)
      .then((product) =>
        res.render("detail-sanpham", {
          product: mongooseToObject(product),
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
