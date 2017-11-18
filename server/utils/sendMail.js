import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export default (groupEmails, priority) => {
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
    from: '"PostIt" <postitappmail@gmail.com>',
    to: groupEmails,
    subject: 'PostIt Notification',
    text: 'PostIt',
    html: `<head>
    <style>
        #body-wrapper{
            background-color: #f5f5f5;
            margin-right: 15%;
            margin-left: 15%;
            border-radius: 10px;
        }

        #header{
            background-color: #263647;
            padding: 10px 0 10px 30px;
            color: #ffffff;
        }
        .footer{
            padding: 0 10px 20px 30px;
            color: #263647;
            font-size: 12px;
          margin-top: 10px
        }
        #inner-body{
            padding: 0 30px 10px 30px;
        }
        #notify-header{
            color: #000;
        }
        hr{
            border: 0;
            border-top: 1px solid #eee;
            height: 0;
            box-sizing: content-box;
            display: block;
            unicode-bidi: isolate;
        }

      #complementary{
        padding-left: 15px
      }
    </style>
    </head>
    <body>
    <div id="body-wrapper">
    <h2 id="header"><span>Post It</span></h2>
    <div id="inner-body">
        <h5 id="notify-header">Hi there,</h5>
      <p id="complementary">This is to notify you that you have a message that 
      is <strong>${priority}</strong> on PostIt.</p>
        Kindly click on the box provided to access your account.
      <div style="width: 100%; margin-top: 20px">
<a href="https://heroku-postitapp.herokuapp.com/signin" style="width: 150px;
padding:10px 0; text-decoration: none; cursor: pointer !important;
display: block; border: 1px solid #263647; background-color: #fff;
color: #263647; font-size: 18px; margin: auto; text-align: center">Sign in</a>
    </div>
    </div>
    <hr/>
    <div class="footer">
      <p>Truly yours,</p>
      <p id="footer">PostIt Team</p>
    </div>
</div>
</body>`
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return (error, info);
    }
  });
};

