const admins = require("../../models/Admin");
const users = require("../../models/User");
const products = require("../../models/Product");
const {
  mongooseToObject,
  mutipleMongooseToObject,checkLoginForOption
} = require("../../../util/mongoose");
const bcrypt = require("bcryptjs");

const crypto = require("crypto");

class RegisterController {

  index(req, res, next) {
    
    var lst = checkLoginForOption(req.session)

    res.render('register',{
      loginAccount: lst[0],
      registerLogout: lst[1]
    });
  }

  // }
  register(req, res, next) {
    const data = req.body;
    console.log(data);
    // res.redirect(`/`);
    // const data = {
    //   "username":"sabols2k",
    //   "email":"dangducchau2000@gmail.com",
    //   "password":"123456",
    //   "name":"chaudd",
    //   "age":"21",
    //   "img":"aaaa",
    //   "role":"user"
    // };
    data.img = "img_avatar.png"
    data.passwordHash=bcrypt.hashSync(data.password, 10);
    const user = new users(data);
     console.log(user);
    // product.save(function (err) {
    //   console.log(err);
    // }).then(() => res.redirect(`/`));

    // res.redirect('http://localhost:3001/zestreact/app/product/dashboard')

    user.save()
    .then(item => 
    { 
      res.redirect('/login')
      // res.send("item saved to database");
    })

    .catch(error =>{
      res.status(400).send("unable to save to database");
    });
    // res.json(data);
    
      
     
  }

}

module.exports = new RegisterController();

// const courseController = require('./CourseController');
