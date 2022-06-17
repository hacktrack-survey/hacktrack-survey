const express = require("express");
const router = express.Router();

const FormController = require('../controllers/formCreationController');

// Using a body parser for form parsing
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.redirect(req.baseUrl + '/create');
});

router.get('/create', FormController.GET_CreationForm);
router.post('/create', FormController.POST_CreationForm);

module.exports = router;