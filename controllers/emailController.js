const postmark = require("postmark");

const emailForm = require("../models/email/emailForm.json"); //emailForm.json Template

const mailClient = new postmark.ServerClient(process.env.MAIL_TOKEN); // Email Server Client

function sendFormCreationMail(formMetaData, formUrl, formUuid, dashboard_url) {
  emailForm.To = formMetaData.email;
  emailForm.TemplateModel.form_url = formUrl;
  emailForm.TemplateModel.hackathon_name = formMetaData.name;
  emailForm.TemplateModel.hackathon_org = formMetaData.organizer[0];
  emailForm.TemplateModel.form_uuid = formUuid;
  emailForm.TemplateModel.dashboard_url = dashboard_url;
  mailClient.sendEmailWithTemplate(emailForm);
}

module.exports = { sendFormCreationMail };
