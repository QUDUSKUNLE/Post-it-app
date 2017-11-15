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
    from: '"PostIt-App" <postitmail@gmail.com>',
    to: groupEmails,
    subject: 'You have a new Message',
    text: 'PostIt-App',
    html: `
    <div>
      <hr style="height: 0.5px; background-color: white;
        width: 100%;" />
        <div>
          <h2 style="margin-top: 25px;">Congratulations!!!</h2>
          <p> Good day to you, 
          <br />&#160;&#160;&#160;&#160;&#160;&#160;
          You have an <b>important</b> message on PostIt.</p>
          <p>Kindly checkout this link to log in and view your 
          message  
          <a href="https://heroku-postitapp.herokuapp.com/signin">
          https://heroku-postitapp.herokuapp.com/signin</a>.</p>
        </div>
        <div style="margin-bottom: 15px;">
          <h5>Truly yours,</h5>
          <p><b>The PostIt Team</b></p>
        </div>
        <hr style="height: 0.5px; background-color: white;
        width: 100%;" />
      </div>`
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return (error, info);
    }
  });
};

