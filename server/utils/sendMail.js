import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export default (groupEmails) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 25,
    secure: false,
    auth: {
      user: process.env.APP_EMAIL,
      pass: process.env.APP_PASSWORD
    },
    tls: { rejectUnauthorized: false }
  });
  const mailOptions = {
    from: '"PostIt" <postitmail@gmail.com>',
    to: groupEmails,
    subject: 'PostIt Message Notification',
    text: 'PostIt',
    html: `
    <body style="max-width:100%; color: #000;">
    <div style="padding:10px; color:black; height: 50px;">
      <h6 style="text-align: left;
        font-size: 30px; margin-top: 10px; margin-left: 8px">PostIt
      </h6>
    </div>
    <div style="outline: 0px solid black; padding-left: 20px;
    padding-right: 30px;
    box-shadow: 0 27px 55px 0 rgba(0, 0, 0, 0.3), 0 17px 17px 0 rgba(0, 0, 0, 0.15);">
    <div>
      <p style="margin-top: 20px">Dear esteemed user,</p>
      <p style="margin-left: 20px">
      This is to notify you that you have a message to attend to on PostIt.</p>
    </div>
    <p>Kindly checkout this link to log in and view your message  
      <a href="https://heroku-postitapp.herokuapp.com/signin">
          PostIt</a>.</p>
      <br>
      <p style="text-align: left;">Truly yours,<br>
      <br>The PostIt Team.</p>
      <br>
      <br>
      </div>
    </body>`
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return (error, info);
    }
  });
};

