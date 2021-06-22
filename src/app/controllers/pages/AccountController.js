const products = require('../../models/Product');
const {mongooseToObject} = require('../../../util/mongoose');
const {mutipleMongooseToObject} = require('../../../util/mongoose');

class AccountController {

  index(req, res, next) {
    res.render('account');
  }
  notfoud(req, res, next){
    res.send(404);
}


}

module.exports = new AccountController();