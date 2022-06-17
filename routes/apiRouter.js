const express = require("express");
const router = express.Router();

const dbController = require("../controllers/dbController");
const googleAPIController = require("../controllers/googleAPIController");

router.get("/forms", function (req, res, next) {
  const surveys = dbController.getAllSurveys();
  res.json(surveys);
});

router.get("/form/:uuid/responses", function (req, res, next) {
  const entry = dbController.getSurvey(req.params.uuid);
  try {
    googleAPIController
      .getSurveyResponses(entry.formId)
      .then((formResponses) => {
        res.json(formResponses);
      });
  } catch (error) {
    res.json({});
  }
});

router.get("/form/:uuid", function (req, res, next) {
  const entry = dbController.getSurvey(req.params.uuid);
  try {
    res.json(entry);
  } catch (error) {
    res.json({});
  }
});

module.exports = router;
