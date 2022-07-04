const nodemailer = require("nodemailer");  // NEW
const ejs=require('ejs');


let transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_WP,
  },
});

function sendFormCreationMail(formMetaData, formUrl, formUuid, dashboard_url) {
  let subject = `${formMetaData.organizer[0]}, your Google Form is here!`;
  ejs.renderFile("./views/email.ejs",{hackathon_name: formMetaData.name,hackathon_org:formMetaData.organizer[0],form_url:formUrl,dashboard_url:dashboard_url,form_uuid:formUuid},function (err,data) {
  var mainOptions = {
    from: `"Hackathon Planning Kit" <${process.env.EMAIL}>`,
    to: formMetaData.email,
    subject: subject, // Subject line
    html: data // html body
  };
  transporter.sendMail(mainOptions);});
}

module.exports = { sendFormCreationMail };
