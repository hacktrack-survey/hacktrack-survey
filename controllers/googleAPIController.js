"use strict";

const path = require("path");
const google = require("@googleapis/forms");

const credentials = {
  type: process.env.GAPI_TYPE,
  project_id: process.env.GAPI_PROJECT_ID,
  private_key_id: process.env.GAPI_PRIVATE_KEY_ID,
  private_key: process.env.GAPI_PRIVATE_KEY.replace(/\\n/g, "\n"),
  client_email: process.env.GAPI_CLIENT_EMAIL,
  client_id: process.env.GAPI_CLIENT_ID,
  auth_uri: process.env.GAPI_AUTH_URI,
  token_uri: process.env.GAPI_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.GAPI_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.GAPI_CLIENT_X509_CERT_URL,
};

function getGoogleAPIConnection() {
  const auth = new google.auth.GoogleAuth({
    credentials: credentials,
    scopes: ["https://www.googleapis.com/auth/drive.file"],
  });
  return google.forms({
    version: "v1",
    auth: auth,
  });
}

async function createSurveyForm(surveyFormJSON, surveyUpdateFormJSON) {
  const forms = getGoogleAPIConnection();
  const responseForCreation = await forms.forms.create({
    requestBody: surveyFormJSON,
  });
  // console.log("=============================== Creation Response ===============================")
  // console.log(responseForCreation.data);
  // console.log("------------------------------------------------------------");

  const responseForUpdate = await forms.forms.batchUpdate({
    formId: responseForCreation.data.formId,
    requestBody: surveyUpdateFormJSON,
  });
  // console.log("=============================== Update Response ===============================")
  // console.log(responseForUpdate.data.form);
  // console.log("------------------------------------------------------------");

  return responseForCreation.data;
}

async function getSurveyResponses(surveyFormId) {
  const forms = getGoogleAPIConnection();
  const responseForSurveyResponsesRequest = await forms.forms.responses.list({
    formId: surveyFormId,
  });
  return responseForSurveyResponsesRequest.data;
}

if (module === require.main) {
  createSurveyForm().catch(console.error);
  getSurveyResponses().catch(console.error);
}

module.exports = { createSurveyForm, getSurveyResponses };
