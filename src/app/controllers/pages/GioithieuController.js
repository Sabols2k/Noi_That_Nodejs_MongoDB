const products = require('../../models/Product');
const {mongooseToObject} = require('../../../util/mongoose');
const {mutipleMongooseToObject} = require('../../../util/mongoose');

class GioithieuController {

  index(req, res, next) {
    res.render('gioi-thieu');
  }
  notfoud(req, res, next){
    res.send(404);
}

 

}

module.exports = new GioithieuController();

// const courseController = require('./CourseController');
