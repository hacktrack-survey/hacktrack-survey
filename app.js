const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const favicon = require("serve-favicon");
require("dotenv").config();

const testRouter = require("./routes/testRouter");
const surveyRouter = require("./routes/surveyRouter");
const apiRouter = require("./routes/apiRouter");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "/favicon.ico")));

app.use("/test", testRouter);
app.use("/survey", surveyRouter);
app.use("/api", apiRouter);

// redirect "/" to "/survey"
app.get("/", function (req, res, next) {
  res.redirect("/survey");
});

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
  console.error(err.stack);
  res.status(500).send("Error 500 - Something broke!");
});

module.exports = app;
