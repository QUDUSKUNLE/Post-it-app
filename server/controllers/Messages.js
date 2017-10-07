import moment from 'moment';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import values from 'object.values';
import dbConfig from '../config/dbConfig';
import Helper from '../helper/Helper.js';
import { sendGroupSMS } from '../utils/utils.js';

dotenv.config();

/**
* class Messages: controls all Messages
* @class Messages
*/
export default class Messages {

  /**
  * @param {Object} req requset object
  * @param {Object} res response object
  * @return {Object} response containing send message to General Group
  */
  static sendGeneralMessage(req, res) {
    const { message, priority, userName, email } = req.body;
    const userId = req.user.uid;
    const time = moment().format('llll');
    if (userId === undefined) {
      res.status(400).send({ error: {
        code: 'PERMISSION_DENIED',
        message: 'User is not signed in' }
      });
    } else if (message.length < 1) {
      res.status(400).send({ error: 'No message sent' });
    } else if (userName === undefined ||
      email === undefined || message === undefined) {
      res.status(400).send({ error: 'No message sent' });
    } else {
      return Promise.all([
        dbConfig.database().ref('Group/general/message').child(userId).push({
          message, priority, email, userName, time }),
          { message, priority, email, userName, time }
      ])
    .then(response => res.status(200).send({
      message: 'message sent succesfully', response }))
    .catch(error => res.status(500).send({ error }));
    }
  }

  /**
  * @param {Object} req requset object
  * @param {Object} res response object
  * @return {Object} response containing get general Messages
  */
  static getGeneralMessage(req, res) {
    Promise.all([
      dbConfig.database().ref('Group/general').child('message')
        .once('value', snapshot => snapshot.val())
    ])
      .then(response => res.status(200).send({ response }))
      .catch(error => res.status(400).send({ error }));
  }

  /**
  * @param {Object} req requset object
  * @param {Object} res response object
  * @return {Object} response containing send Messages to group
  */
  static sendGroupMessage(req, res) {
    const { groupName, message, priority, userName, email } = req.body;
    const userId = req.user.uid;
    const time = moment().format('llll');
    if (userId === undefined) {
      res.status(400).send({ error: {
        code: 'PERMISSION_DENIED',
        message: 'User is not signed in' }
      });
    } else if (message.length < 1) {
      res.status(400).send({ error: 'No message sent' });
    } else if (userName === undefined ||
      email === undefined || message === undefined) {
      res.status(400).send({ error: 'No message sent' });
    } else {
      const group = groupName.toLowerCase();
      return Promise.all([
        dbConfig.database().ref(`Group/${userId}/${group}`)
          .child('message').push({ message, priority, userName, email, time }),
            { message, priority, userName, email, time }
      ])
        .then(response => res.status(200).send({
          message: 'Broadcast Message sent successfully', response }))
        .catch(error => res.send({ error }));
    }
  }

  /**
  * @param {Object} req requset object
  * @param {Object} res response object
  * @return {Object} response containing get Messages from a group
  */
  static getGroupMessage(req, res) {
    const group = req.body.group;
    const userId = req.user.uid;
    return Promise.all(
      [
        dbConfig.database().ref(`Group/${userId}/${group}`).child('message')
          .once('value', snapshot => snapshot.val())
      ])
      .then(response => res.status(200).send({ response }))
      .catch(error => res.status(400).send({ error }));
  }

  // Send Message
  static sendMessageToGroup(req, res) {
    const { message, priority } = req.body;
    const groupId = req.params.groupId;
    const userId = req.user.uid;
    const time = moment().format('llll');
    if (userId === undefined) {
      res.status(400).send({ error: {
        code: 'PERMISSION_DENIED',
        message: 'User is not signed in' }
      });
    } else if (message.length < 1) {
      res.status(400).send({ error: 'No message sent' });
    } else {
      Helper.getUserEmailAndPhoneNumber(userId)
        .then(senderDetails => {
          const sender = values(senderDetails)[0];
          const userName = sender.userName;
          const email = sender.userEmail;
          Helper.getGroupPhoneNumbers(groupId).then(groupPhoneAndEmail => {
            if (priority === 'urgent') {
              const groupEmails = Helper.getGroupEmails(groupPhoneAndEmail);
              const transporter = nodemailer.createTransport({
                service: 'gmail',
                port: 25,
                secure: false,
                auth: {
                  user: process.env.APP_EMAIL,
                  pass: process.env.APP_PASSWORD },
                tls: { rejectUnauthorized: false }
              });
              const mailOptions = {
                from: '"PostIt-App" <postitmail@gmail.com>',
                to: groupEmails,
                subject: 'New Message Received',
                text: 'PostIt-App',
                html: '<b>Hello, </b> this is to notify you ' +
                  'that you have an important new message'
              };
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  return console.log(error);
                } else {
                  console.log('Message sent: %s', info.messageId);
                  console.log('Preview URL: %s',
                    nodemailer.getTestMessageUrl(info));
                }
              });
            } else if (priority === 'critical') {
              const groupEmails = Helper.getGroupEmails(groupPhoneAndEmail);
              const groupPhoneNumbers = Helper.getPhoneNumbers(
                groupPhoneAndEmail);
              sendGroupSMS(groupPhoneNumbers).then(res => {
                if (res) {
                  console.log(res[0].body);
                  const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    port: 25,
                    secure: false,
                    auth: {
                      user: process.env.APP_EMAIL,
                      pass: process.env.APP_PASSWORD },
                    tls: { rejectUnauthorized: false }
                  });
                  const mailOptions = {
                    from: '"PostIt-App" <postitmail@gmail.com>',
                    to: groupEmails,
                    subject: 'New Message Received',
                    text: 'PostIt-App',
                    html: '<b>Hello, </b> this is to notify you ' +
                      'that you have an important new message'
                  };
                  transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                      return console.log(error);
                    } else {
                      console.log('Message sent: %s', info.messageId);
                      console.log('Preview URL: %s',
                        nodemailer.getTestMessageUrl(info));
                    }
                  });
                }
              });
            }
          });
          return Promise.all([
            dbConfig.database().ref('Messages')
              .child(groupId).push({
                message, priority, userName, email, time }),
                { message, priority, userName, email, time }
          ])
            .then(response => res.status(200).send({
              message: 'Broadcast Message sent successfully', response }))
            .catch(error => res.send({ error }));
        })
        .catch(error => res.status(400).send({ error }));
    }
  }

  static getMessage(req, res) {
    const groupId = req.params.groupId;
    const userId = req.user.uid;
    if (userId === undefined) {
      res.status(400).send({ error: 'User not signed in' });
    } else {
      return Promise.all(
        [
          dbConfig.database().ref('Messages').child(groupId)
            .once('value', snapshot => snapshot.val())
        ])
        .then(response => {
          if (response) {
            res.status(200).send({ response });
          }
        })
        .catch(error => res.status(400).send({ error }));
    }
  }
}

