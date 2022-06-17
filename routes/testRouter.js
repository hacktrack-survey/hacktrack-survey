/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */

const express = require('express');
const router = express.Router();

const dbTester = require('../tools/dbTester');
const emailController = require("../controllers/emailController");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect(req.baseUrl + '/dbtest');
});

router.get('/dbTest', function(req, res, next) {
  console.log('testing db');
  dbTester.testAddDBEntry();
  res.send('Done');
});

router.get('/email', function(req, res, next) {
  emailController.sendFormCreationMail({
    'email' : 'Alexander.Hochhalter@stud.uni-due.de',
    'name'  : 'Alex',
    'organizer' : 'Auch Alex',
  }, 'https://google.de');
  res.send("email sent.");
});

module.exports = router;
