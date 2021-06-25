const products = require('../../models/User');
const {mongooseToObject} = require('../../../util/mongoose');
const {mutipleMongooseToObject,checkLoginForOption } = require('../../../util/mongoose');

class DetailuserController {

  index(req, res, next) {
    var lst = checkLoginForOption(req.session)
    // console.log(req.session.userid)
    products
      .findById(req.session.userid)
      .then((user) =>
        res.render("account", {
          user: mongooseToObject(user),
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

module.exports = new DetailuserController();

// const courseController = require('./CourseController');
