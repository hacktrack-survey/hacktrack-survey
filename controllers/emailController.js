const postmark = require("postmark");

const emailForm = require("../models/email/emailForm.json"); //emailForm.json Template

const mailClient = new postmark.ServerClient(process.env.MAIL_TOKEN); // Email Server Client

function sendFormCreationMail(formMetaData, formUrl, formUuid) {
  emailForm.To = formMetaData.email;
  emailForm.TemplateModel.form_url = formUrl;
  emailForm.TemplateModel.hackathon_name = formMetaData.name;
  emailForm.TemplateModel.hackathon_org = formMetaData.organizer;
  emailForm.TemplateModel.form_uuid = formUuid;
  mailClient.sendEmailWithTemplate(emailForm);
}

module.exports = { sendFormCreationMail };
