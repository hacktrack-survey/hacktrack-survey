const nodemailer = require("nodemailer");  // NEW
const ejs=require('ejs');


let transporter = nodemailer.createTransport({
  host:"smtp-relay.sendinblue.com",
  port: 587,
  secure: false,
  auth: {
    user: 'test@sixonenine.club',
    pass: process.env.EMAIL_WP,
  },
});

function sendFormCreationMail(formMetaData, formUrl, formUuid, dashboard_url) {
  let subject = `${formMetaData.organizer[0]}, your Google Form is here!`;
  ejs.renderFile("./views/email.ejs",{hackathon_name: formMetaData.name,hackathon_org:formMetaData.organizer[0],form_url:formUrl,dashboard_url:dashboard_url,form_uuid:formUuid},function (err,data) {
  var mainOptions = {
    from: '"Hackathon planning kit" <test@sixonenine.club>',
    to: formMetaData.email,
    subject: subject, // Subject line
    html: data // html body
  };
  transporter.sendMail(mainOptions);});
}

module.exports = { sendFormCreationMail };
