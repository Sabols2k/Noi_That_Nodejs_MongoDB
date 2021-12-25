require("dotenv").config();
// require('rootpath')();
// var cookieSession = require('cookie-session');
var session = require("express-session");
const express = require("express");
const path = require("path");
var methodOverride = require("method-override");
const handlebars = require("express-handlebars");
const morgan = require("morgan");
const app = express();

var argv = require('minimist')(process.argv.slice(2));
var swagger = require("swagger-node-express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const port = 3000;

const route = require("./routes");
const db = require("./config/db"); //database mongodb

const axios = require("axios");




// var MongoStore = require('connect-mongo')(session);

// enable CORS
// enable CORS
app.use(
  cors({
    origin: "http://localhost:3000", // url of the frontend application
    credentials: true, // set credentials true for secure httpOnly cookie
  })
);




// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// use cookie parser for secure httpOnly cookie
app.use(cookieParser(process.env.COOKIE_SECRET));
//Connect to DB

db.connect();

app.use(express.static(path.join(__dirname, "public")));

//middleware
app.use(
  express.urlencoded({
    extend: true,
  })
); //
app.use(express.json()); //

app.use(methodOverride("_method")); //chuyển đổi method ở form
//HTTP logger
// app.use(morgan('combined')); //gửi các request URL

//template engine
app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
      calc: function (a, operator, b) {
        switch (operator) {
          case "+":
            return a + b;
          case "-":
            return a - b;
          case "*":
            return a * b;
          case "/":
            return a / b;
          default:
            return false;
        }
      },
      ifcond: function (v1, operator, v2, options) {
        switch (operator) {
          case "==":
            if (v1 == v2) return true;
            else return false;
          case "===":
            if (v1 === v2) return true;
            else return false;
          case "!=":
            if (v1 != v2) return true;
            else return false;
          case "!==":
            if (v1 !== v2) return true;
            else return false;
          case "<":
            if (v1 < v2) return true;
            else return false;
          case "<=":
            if (v1 <= v2) return true;
            else return false;
          case ">":
            if (v1 > v2) return true;
            else return false;
          case ">=":
            if (v1 >= v2) return true;
            else return false;
          case "&&":
            if (v1 && v2) return true;
            else return false;
          case "||":
            if (v1 || v2) return true;
            else return false;
          default:
            return false;
        }
      },
      setvar: function (varName, varValue) {
        varName = varValue;
        return varName;
        // root[varName] = varValue;
      },
    },
  })
);

// function intervalFunc() {
//   axios.get('http://localhost:3000/api')
//   .then(response => {
//     console.log(response.data);
//     // console.log(response.data.explanation);
//   })
//   .catch(error => {
//     console.log(error);
//   });
// }

// // setInterval(intervalFunc, 2000);



//api 
var subpath = express();
app.use(bodyParser());
app.use("/api", subpath);
swagger.setAppHandler(subpath);


subpath.use(express.static(path.join(__dirname, "dist")));

swagger.setApiInfo({
  title: "example API",
  description: "API to do something, manage something...",
  termsOfServiceUrl: "",
  contact: "yourname@something.com",
  license: "",
  licenseUrl: ""
});

subpath.get('/', function (req, res) {
  res.sendfile(__dirname + '/dist/index.html');
});

swagger.configureSwaggerPaths('', 'api-docs', '');

var domain = 'localhost';
if(argv.domain !== undefined)
    domain = argv.domain;
else
    console.log('No --domain=xxx specified, taking default hostname "localhost".');
var applicationUrl = 'http://' + domain;
swagger.configure(applicationUrl, '1.0.0');

///////////


app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views")); // chỉnh sửa thư mục Views để render như ý muốn của mình
// app.set('views', path.join(__dirname, 'resources','views'));
//route init
route(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
