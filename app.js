var createError = require("http-errors");
var express = require("express");
const bodyParser = require("body-parser");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
var cors = require("cors");

var indexRouter = require("./routes/index");
var userRouter = require("./routes/user");
var loginRouter = require("./api/login");
var catalogRouter = require("./api/catalog");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

mongoose.connect(
  "mongodb+srv://marianogermanguerrerodev:Pass@word@cluster1.4i0p6.mongodb.net/eCommerce?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  (err, res) => {
    if (err) return console.log("Hubo un error en la base de datos", err);
    console.log("BASE DE DATOS ONLINE");
  }
);

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/login", loginRouter);
app.use("/catalog", catalogRouter);
console.log("server ok");

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
