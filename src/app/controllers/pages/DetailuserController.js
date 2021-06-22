const products = require('../../models/User');
const {mongooseToObject} = require('../../../util/mongoose');
const {mutipleMongooseToObject} = require('../../../util/mongoose');

class DetailuserController {

  index(req, res, next) {
    console.log(req.session.userid)
    products
      .findById(req.session.userid)
      .then((user) =>
        res.render("account", {
          user: mongooseToObject(user),
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
