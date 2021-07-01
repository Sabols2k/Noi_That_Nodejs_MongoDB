const users = require('../../models/User');
const bill = require('../../models/Bill');
const {mongooseToObject} = require('../../../util/mongoose');
const {mutipleMongooseToObject,checkLoginForOption } = require('../../../util/mongoose');
var fs = require('fs');
const sharp = require('sharp');

class DetailuserController {

  async index(req, res, next) {
    var lst = checkLoginForOption(req.session)
    const user = await users.findById(req.session.userid);
    console.log(user);
    console.log("aaaa")
    // console.log(account);
    // console.log(req.session.userid)
    bill
      .find({ userId: req.session.userid})
      .then((bill) =>
        res.render("account", {
          bill: mutipleMongooseToObject(bill),
          user : mongooseToObject(user),
          loginAccount: lst[0],
          registerLogout: lst[1]
        })
      )
      .catch(next);
  }
  async changeAvatar(req, res, next) {
    console.log("file")
    console.log(req.file)
    console.log("file1")
    var query = { _id: req.session.userid }
    console.log(query)
    console.log("file2")
    var img_name = req.session.userid + '_200x200.jpg'
    var path = './src/public/img/users/' + req.session.userid + '.jpg'
    var resizedImg = './src/public/img/users/' + req.session.userid + '_200x200.jpg'

    //rename image to userid
    fs.renameSync('./src/public/img/users/' + req.file.filename, path)

    //resize
    sharp(path).resize(200, 200).toFile(resizedImg, function (err) {
        if (err) {
            console.log(err)
            return
        }
    })

    const userr = await users.findOneAndUpdate(query, { $set: { img: req.session.userid + '.jpg' } })
    userr.save()

    // res.send({ status: true, image: img_name })
    res.redirect('/account')
}
  notfoud(req, res, next){
    res.send(404);
  }
}

module.exports = new DetailuserController();

// const courseController = require('./CourseController');
