import moment from 'moment';
import values from 'object.values';

import dbConfig from '../config/dbConfig';
import DestructureFirebaseData from '../helper/DestructureFirebaseData';
import sendMail from '../utils/sendMail';
import sendSMS from '../utils/sendSMS';
import QueryDatabase from '../helper/QueryDatabase';

/**
 * @description This class create and read functions for Messages
 * @class MessageController
 */
export default class MessageController {
  /**
   * @description This method send message to group
   * route POST: api/v1/sendMessage/:groupId
   *
   * @param {Object} req request object
   * @param {Object} res response object
   *
   * @return {Object} json response contains message sent details
   */
  static sendMessageToGroup(req, res) {
    const message = req.body.message;
    const priority = req.body.priority;
    const groupId = req.params.groupId;
    const userId = req.decoded.data.userId;
    const time = moment().format('llll');
    QueryDatabase.getUserEmailAndPhoneNumber(userId)
      .then((senderDetails) => {
        const sender = values(senderDetails)[0];
        const userName = sender.userName;
        const email = sender.userEmail;
        QueryDatabase.getGroupPhoneNumbers(groupId).then((
          groupPhoneAndEmail) => {
          if (priority === 'urgent') {
            const groupEmails = DestructureFirebaseData.getGroupEmails(
              groupPhoneAndEmail);
            sendMail(groupEmails);
          } else if (priority === 'critical') {
            const groupEmails = DestructureFirebaseData.getGroupEmails(
              groupPhoneAndEmail);
            const groupPhoneNumbers = DestructureFirebaseData.getPhoneNumbers(
              groupPhoneAndEmail);
            sendSMS(groupPhoneNumbers).then((res) => {
              if (res) {
                sendMail(groupEmails);
              }
            });
          }
        });
        return Promise.all([
          dbConfig.database().ref('Messages')
            .child(groupId).push({
              message, priority, userName, email, time
            }),
          { message, priority, userName, email, time }
        ])
          .then(response => res.status(201).send({
            message: 'Broadcast Message sent successfully', response
          }))
          .catch(error => res.status(500).send({ error }));
      })
      .catch(error => res.status(403).send({ error }));
  }

  /**
   * @description This method retrieves all message in a group
   * route GET: api/v1/getMessage/:groupId
   *
   * @param {Object} req request object
   * @param {Object} res response object
   *
   * @return {Object} json response contains all message in a group
   */
  static getMessage(req, res) {
    const groupId = req.params.groupId;
    return Promise.all([
      dbConfig.database().ref('Messages').child(groupId)
        .once('value', snapshot => snapshot.val())
    ])
      .then(response => res.status(200).send({ response }))
      .catch(error => res.status(403).send({ error }));
  }
}

