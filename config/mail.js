// config/mail.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, // secure port for SSL
  secure: true, // use SSL
  auth: {
    user: "pradeepk9348@gmail.com",
    pass: 'iflf xafm nrjy suzj', // should be an App Password if using Gmail
  },
});

module.exports = transporter;
