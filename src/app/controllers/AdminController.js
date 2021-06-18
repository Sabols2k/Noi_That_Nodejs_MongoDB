const admins = require("../models/Admin");
const products = require("../models/Product");
const { mongooseToObject } = require("../../util/mongoose");
const { mutipleMongooseToObject } = require("../../util/mongoose");
const bcrypt = require("bcryptjs");


const crypto = require("crypto");

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
  // checksession(req, res, next){

  // }
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
    req.session.user1 = "abccccc";
    console.log(req.session);
    products
      .find({})
      .then((product) =>
        res.render("products/stored-products", {
          products: mutipleMongooseToObject(product),
        })
      )
      .catch(next);
  }

  //[POST] /courses/create
  create(req, res, next) {
    
    // req.session.user2 = "abc1111cc";
    console.log(req.session);
    res.render("products/create");
  }

  //[POST] /courses/store
  async store(req, res, next) {
    // res.render('courses/create');
    // const data = req.body;
    // console.log(formData);
    // res.redirect(`/`);
    const user = await admins.findOne({ username: "chaudd" });
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
      token: crypto.randomBytes(40).toString("hex"),
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
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
    products
      .deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
}

module.exports = new AdminController();

// const courseController = require('./CourseController');
