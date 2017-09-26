const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 25,
  secure: false,
  auth: { user: process.env.APP_EMAIL, pass: process.env.APP_PASSWORD },
  tls: { rejectUnauthorized: false }
});

const mailOptions = {
  from: '"PostIt app 👻" <postitmail@gmail.com>',
  to: 'ibrahim.abdulazeez@andela.com',
  subject: 'New Message Received',
  text: 'PostIt-App',
  html: '<b>Hello, </b> this is to notify you that you have a new message'
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
  }
  console.log('Message sent: %s', info.messageId);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
});
