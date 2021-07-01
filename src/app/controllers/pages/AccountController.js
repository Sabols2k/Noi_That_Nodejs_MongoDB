const products = require('../../models/Product');
const bill = require('../../models/Bill');
const {mongooseToObject} = require('../../../util/mongoose');
const {mutipleMongooseToObject,checkLoginForOption } = require('../../../util/mongoose');

class AccountController {

  async index(req, res, next) {
    const account = await bill.find({ userId: req.session.userid})
    var lst = checkLoginForOption(req.session)
    console.log("aaaa")
    console.log(account);
    res.render('account',{
      loginAccount: lst[0],
      registerLogout: lst[1]
    });
  }
  notfoud(req, res, next){
    res.send(404);
}


}

module.exports = new AccountController();