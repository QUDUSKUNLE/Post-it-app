import nodemailer from 'nodemailer';


export const sendEmail = (groupEmails) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 25,
    secure: false,
    auth: { user: process.env.APP_EMAIL, pass: process.env.APP_PASSWORD },
    tls: { rejectUnauthorized: false }
  });

  const mailOptions = {
    from: '"PostIt-App" <postitmail@gmail.com>',
    to: groupEmails,
    subject: 'New Message Received',
    text: 'PostIt-App',
    html: '<b>Hello, </b> this is to notify you that you have a new message'
  };
  transporter.sendMail(mailOptions, (error, info) => {
    return new Promise(resolve => {
      if (error) {
        resolve(error);
      }
      resolve(info.messageId);
    });
    // console.log('Message sent: %s', info.messageId);
    // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
};

