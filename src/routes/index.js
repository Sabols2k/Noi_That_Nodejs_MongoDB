
var session = require("express-session");
const multer = require("multer");

//admin
const meRouter = require("./me");
const adminRouter = require("./admin/admin");
const adminuserRouter = require("./admin/user");
const adminadminRouter = require("./admin/admins");
const adminproductRouter = require("./admin/product");
const adminloginRouter = require("./admin/login");
const adminlogoutRouter = require("./admin/logout");

//pages
const loginRouter = require("./pages/login");
const logoutRouter = require("./pages/logout");
const registerRouter = require("./pages/register");
const allsanphamRouter = require("./pages/allsanpham");
const detailsanphamRouter = require("./pages/detailsanpham");
const profileRouter = require("./pages/profile");
const productRouter = require("./pages/product");
const uploadRouter = require("./pages/upload");
const uploadfileRouter = require("./pages/uploadfile");
const homeRouter = require("./pages/home");
const gioithieuRouter = require("./pages/gioithieu");
const lienheuRouter = require("./pages/lienhe");
const cartRouter = require("./pages/cart");
const checkoutRouter = require("./pages/checkout");
const accountRouter = require("./pages/account");



function route(app) {
  app.use(
    session({
      secret: "work hard",
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 30 * 1000 * 60 },
      // store: new MongoStore({
      //   mongooseConnection: db
      // })
    })
  );

  //admin
  app.use("/adminlogin",checkNotLoggedInAdmin, adminloginRouter);
  app.use("/adminlogout", checkLoggedInAdmin,adminlogoutRouter);
  app.use("/admin-dashboard",checkLoggedInAdmin, adminRouter);
  app.use("/adminuser",checkLoggedInAdmin, adminuserRouter);
  app.use("/all-admin", adminadminRouter);
  app.use("/adminproduct",checkLoggedInAdmin, adminproductRouter);
  // app.use("/admin", checkLoggedInAdmin, adminRouter);adminadminRouter

    //pages
    app.get('/', (req, res) => {
      res.redirect('/home')
    })
    app.use("/gioi-thieu", gioithieuRouter);
    app.use("/lien-he", lienheuRouter);
    app.use("/cart", cartRouter);
    app.use("/checkout", checkoutRouter);
    app.use("/product", productRouter);
    app.use("/all-sanpham", allsanphamRouter);
    app.use("/detail-sanpham", detailsanphamRouter);
    app.use("/account",checkLogged, profileRouter);
    app.use("/upload", uploadRouter);
    app.post("/uploadfile",upload.single('myFile'),uploadfileRouter);
    app.use("/login", checkNotLoggedIn, loginRouter);
    app.use("/logout", logoutRouter);
    app.use("/register", registerRouter);
    app.use("/home", homeRouter);
    // app.use("/account", accountRouter);
  
}
const checkLoggedInAdmin = (req, res, next) => {
  if (req.session.adminloggedIn) {
    next();
  } else {
    res.redirect("/adminlogin");
  }
};
const checkNotLoggedInAdmin = (req, res, next) => {
  if (!req.session.adminloggedIn) {
    next();
  } else {
    res.redirect("/admin-dashboard");
  }
};
function checkLogged(req, res, next) {
  console.log(req.session.loggedIn);
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
  // if (req.session.loggedIn){
  //   next();
  // }
  // console.log(req.session.loggedIn)
  // next();
}
const checkNotLoggedIn = (req, res, next) => {
  if (!req.session.loggedIn) {
      next()
  } else {
      res.redirect('/home');
  }
}


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
 
var upload = multer({ storage: storage })

module.exports = route;
