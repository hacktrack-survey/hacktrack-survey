const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const fileChecker = require("../tools/fileChecker");

fileChecker.createFileIfNotExists(
  path.join(__dirname, "../models/data/surveyDb.json"),
  { surveys: [] }
);

const surveyDB = require("../models/data/surveyDb.json");

function saveSurvey(formId, metadata) {
  const entry = {
    formId: formId,
    uuid: crypto.randomUUID(),
    "meta-data": metadata,
  };

  addEntry(entry);

  return entry;
}

function addEntry(entry) {
  const surveys = surveyDB.surveys.filter((e) => e.uuid === entry.uuid);

  if (surveys.length > 0) {
    console.log("Survey entry already saved! Overwriting old entry...");
    surveyDB.surveys.pop(
      surveyDB.surveys.findIndex((e) => {
        return e.uuid == entry.uuid;
      })
    );
  }

  surveyDB.surveys.push(entry);

  fs.writeFileSync(
    "models/data/surveyDb.json",
    JSON.stringify(surveyDB),
    "utf-8",
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
}

function getSurvey(uuid) {
  const surveys = surveyDB.surveys.filter((entry) => entry.uuid === uuid);
  if (surveys === undefined || surveys.length === 0) {
    return {};
  }
  return surveys[0];
}

function getAllSurveys() {
  return surveyDB.surveys;
}

module.exports = { saveSurvey, getSurvey, getAllSurveys };
