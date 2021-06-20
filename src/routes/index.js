
var session = require("express-session");
const multer = require("multer");

//admin
const meRouter = require("./me");
const adminRouter = require("./admin/admin");
const adminloginRouter = require("./admin/login");
const adminlogoutRouter = require("./admin/logout");

//pages
const productRouter = require("./pages/product");
const uploadRouter = require("./pages/upload");
const uploadfileRouter = require("./pages/uploadfile");




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
  app.use("/admin", checkLoggedInAdmin, adminRouter);// /admin/{xxx}
  app.use("/adminlogin",checkNotLoggedInAdmin, adminloginRouter);
  app.use("/adminlogout", adminlogoutRouter);
  app.use("/me", meRouter);

    //user
    app.use("/product", productRouter);
    app.use("/upload", uploadRouter);
    app.post("/uploadfile",upload.single('myFile'),uploadfileRouter);
    app.use("/login",checkNotLoggedIn, adminloginRouter);
    app.use("/logout", adminlogoutRouter);
    app.use("/", productRouter);
  
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
    res.redirect("/admin");
  }
};
function checkLogged(req, res, next) {
  console.log(req.session.loggedIn);
  if (req.session.loggedIn) {
    next();
  } else {
    res.render("admins/login");
  }
  // if (req.session.loggedIn){
  //   next();
  // }
  // console.log(req.session.loggedIn)
  // next();
}

// const checkLoggedIn = (req, res, next) => {
//   if (req.session.loggedIn) {
//       next();
//   } else {
//     res.redirect('/login')
//   }
// }

const checkNotLoggedIn = (req, res, next) => {
  if (!req.session.loggedIn) {
      next()
  } else {
      res.redirect('/');
  }
}

// const checkNotLoggedInAdmin = (req, res, next) => {
//   if (!req.session.adminLoggedIn) {
//       next()
//   } else {
//       res.render("admin/user", { layout: 'admin.hbs' });
//   }
// }

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
