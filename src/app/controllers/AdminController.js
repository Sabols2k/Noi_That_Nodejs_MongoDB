require("dotenv").config();
const Joi = require("joi");
const validateRequest = require("../../_middleware/validate-request");

const admins = require("../models/Admin");
const products = require("../models/Product");
const refreshToken = require("../models/refreshToken");
const { mongooseToObject } = require("../../util/mongoose");
const { mutipleMongooseToObject } = require("../../util/mongoose");

const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

const crypto = require("crypto");

const userService = require("./user.service")

const posts = [
  {
    username: "Kyle",
    title: "Post 1",
  },
  {
    username: "Jim",
    title: "Post 2",
  },
];

class AdminController {
  index(req, res, next) {
    // res.render('courses/create');
    //Xuất ra JSON API
    // admins.find({}, function (err, admin) {
    //   if(!err) {
    //     res.json(admin)
    //   } else{
    //     res.status(400).json({error: "ERROR"});
    //   }
    // })

    products
      .find({})
      .then((product) =>
        res.render("products/stored-products", {
          products: mutipleMongooseToObject(product),
        })
      )
      .catch(next);
  }

  // show(req, res, next) {
  //   admins.find({}, function (err, admin) {
  //     if(!err) {
  //       res.json(admin)
  //     } else{
  //       res.status(400).json({error: "ERROR"});
  //     }
  //   })
  // }

  //[POST] /courses/create
  create(req, res, next) {
    res.render("products/create");
  }

  //[POST] /courses/store
  async store(req, res, next) {
    // res.render('courses/create');
    // const data = req.body;
    // console.log(formData);
    // res.redirect(`/`);
    const user = await admins.findOne({ "username":"chaudd" });
    // res.send("aa");
    console.log(user);
    // const data = {
    //   "username":"chaudd",
    //   "password":"123456",
    //   "name":"chaudd",
    //   "age":"21",
    //   "img":"aaaa",
    // };
    //data của 
    const data = {
      user: user.id,
      token: crypto.randomBytes(40).toString('hex'),
      expires: new Date(Date.now() + 7*24*60*60*1000),
      // createdByIp: ipAddress
    };
    // data.passwordHash=bcrypt.hashSync('123456', 10);
    // const product = new products(data);
    const product = new refreshToken(data);

    // admin.save(function (err) {
    //   console.log(err);
    // }).then(() => res.redirect(`/`));

    // res.redirect('http://localhost:3001/zestreact/app/admin/dashboard')

    product
      .save()
      .then((item) => {
        res.redirect("/admin");
        // res.send("item saved to database");
      })

      .catch((error) => {
        res.status(400).send("unable to save to database");
      });
    // res.json(data);
  }
//   randomTokenString() {
//     return crypto.randomBytes(40).toString('hex');
// }
  //[GET] /courses/:id/edit
  edit(req, res, next) {
    // res.send(req.params.id);
    products
      .findById(req.params.id)
      .then((admin) =>
        res.render("products/edit", {
          product: mongooseToObject(admin),
        })
      )
      .catch(next);
  }

  //[PUT] /courses/:id
  update(req, res, next) {
    // res.json(req.body);
    products
      .updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/admin"))
      .catch(next);

    // res.send('New Detail!!!');
  }
 //[DELETE] /courses/:id
 destroy(req, res, next) {
  res.json(req.body);
    products.deleteOne({_id: req.params.id})
      .then(() => res.redirect("back"))
      .catch(next);
  }
  showuser(req, res, next) {
    
 

    // req.session.views = (req.session.views || 0) + 1;

    // req.session.username = "sabols2k";
    // // Write response
    // // res.send(req.session.views + ' views')
    // res.send(req.session.username + "");


    // await Adventure.findOne({ country: 'Croatia' }).exec();

    // .then(device => res.json(device))
    
    //   // .then(devices => res.render('courses/edit', {
    //   //   devices: mongooseToObject(devices)
    //   // }))
    //   .catch(next);
    // res.send("happy")
   
    // console.log(user);
  }
 

  //TODO: LOGIN VS REGISTER
  login_UI(req, res, next) {
    // res.send("this is page login");
    res.render("admins/login");
  }

  login(req, res, next) {
    // res.send("this is page login");
    // res.render('admins/login')
    // const authHeader = req.headers['authorization']
    // const token = authHeader && authHeader.split(' ')[1]
    // if (token == null) return res.sendStatus(401)
    // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    //   console.log(err)
    //   if (err) return res.sendStatus(403)
    //   req.user = user
    //   next()
    // })
    // res.json(posts.filter(post => post.username === req.user.name))
  }

}

module.exports = new AdminController();

// const courseController = require('./CourseController');
