const products = require('../../models/Product');
const {mongooseToObject} = require('../../../util/mongoose');
const {mutipleMongooseToObject} = require('../../../util/mongoose');

class LienheController {

  index(req, res, next) {
    res.render('lien-he');
  }
  notfoud(req, res, next){
    res.send(404);
}

 

}

module.exports = new LienheController();

// const courseController = require('./CourseController');
