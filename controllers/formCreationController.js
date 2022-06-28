"use strict";
const googleAPIController = require("./googleAPIController");
const emailController = require("./emailController");

const surveyFormJSON = require("../models/forms/surveyForm.json");
const dbController = require("./dbController");
const metadataExtractor = require("../tools/metadataExtractor");
const creationFormValidator = require("../tools/creationFormValidator");
const surveyFormBuilder = require("../tools/surveyFormBuilder");

function GET_CreationForm(req, res, next) {
  res.render("creationForm", {
    post_url: req.originalUrl,
  });
}

function POST_CreationForm(req, res, next) {
  if (!creationFormValidator.validate(req.body)) {
    console.log("Creation Form is invalid!");
    res.redirect("/");
  } else {
    buildAndSendSurvey(req, res);
  }
}

function buildAndSendSurvey(req, res) {
  const surveyUpdateJSON = surveyFormBuilder.build(req.body);
  const metaData = metadataExtractor.extractMetadata(req.body);

  googleAPIController
    .createSurveyForm(surveyFormJSON, surveyUpdateJSON)
    .then((responseData) => {
      const dbEntry = dbController.saveSurvey(
        Object.assign(responseData.formId, metaData)
      );
      emailController.sendFormCreationMail(
        metaData,
        responseData.responderUri,
        dbEntry.uuid
      );
      res.render("successfullyCreatedSurvey", {
        post_url     : req.originalUrl,
        uuid         : dbEntry.uuid,
        formlink     : responseData.responderUri,
        dashboardlink: "localhost:3001/api/form/" + dbEntry.uuid // TODO: Make address dynamic to not only include localhost!
      });
    });
}

module.exports = { GET_CreationForm, POST_CreationForm };
