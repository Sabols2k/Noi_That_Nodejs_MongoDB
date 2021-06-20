const products = require('../../models/Product');
const {mongooseToObject} = require('../../../util/mongoose');
const {mutipleMongooseToObject} = require('../../../util/mongoose');

class UploadController {

  index(req, res, next) {
    res.render('products/testuploadfile')
  }
  uploadfile(req, res, next){
    res.redirect('back');
  }
  
}

module.exports = new UploadController();

// const courseController = require('./CourseController');
