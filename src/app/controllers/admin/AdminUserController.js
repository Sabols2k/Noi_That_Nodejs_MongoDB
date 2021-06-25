const admins = require("../../models/Admin");
const users = require("../../models/User");
const products = require("../../models/Product");
const {mongooseToObject,mutipleMongooseToObject,checkLoginForOption } = require('../../../util/mongoose');

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

class AdminUserController {
  // checksession(req, res, next){

  // }
  index(req, res, next) {
    var lst = checkLoginForOption(req.session)

    users
      .find({})
      .then((admin) =>
        res.render("admins/user", {
          layout: 'admin.hbs',
          users: mutipleMongooseToObject(admin),
          loginAccount: lst[0],
          registerLogout: lst[1]
        })
      )
      .catch(next);
  }

  //[POST] /adminuser/create
  create(req, res, next) {
    
    const data = req.body;
    data.role="user";
    data.passwordHash=bcrypt.hashSync(data.password, 10);
    console.log(data)
    const user = new users(data);
    user.save()
    .then(item => 
    { 
      res.redirect('/adminuser')
      // res.send("item saved to database");
    })

    .catch(error =>{
      res.status(400).send("unable to save to database");
    });
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
    console.log(req.params.id);
    users
      .updateOne({ _id: req.params.id }, req.body)
      .catch(next);

    // res.send('New Detail!!!');
  }
  //[DELETE] /courses/:id
  destroy(req, res, next) {
    // console.log(req.params.id )
    console.log(req.params)
    users
      .deleteOne({ _id: req.params })
      .then(() => res.redirect("back"))
      .catch(next);
  }
  async delete(req, res, next) {
    try {
        const { id } = req.params
        await users.deleteOne({ _id: id })
        res.redirect("back")
    } catch (err) {
        res.send({ status: false })
    }
}
  page(req, res, next){
    let perPage = 2;
    let page = req.params.page || 1; 
    admins
    .find() // find tất cả các data
    .skip((perPage * page) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
    .limit(perPage)
    .exec((err, products) => {
      admins.countDocuments((err, count) => { // đếm để tính có bao nhiêu trang
        if (err) return next(err);
         res.send(products) // Trả về dữ liệu các sản phẩm theo định dạng như JSON, XML,...
      });
    });
  }
}

module.exports = new AdminUserController();

// const courseController = require('./CourseController');
