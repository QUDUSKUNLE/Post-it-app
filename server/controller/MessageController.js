import moment from 'moment';

import dbConfig from '../config/dbConfig';
import FormatDatabaseResult from '../helper/FormatDatabaseResult';
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
   * @param {Object} req request object
   * @param {Object} res response object
   * @return {Object} json response contains message sent details
   */
  static sendMessageToGroup(req, res) {
    const { message, priority } = req.body;
    const groupId = req.params.groupId;
    const userId = req.decoded.data.userId;
    const time = moment().format('llll');
    QueryDatabase.getUserEmailAndPhoneNumber(userId)
      .then((sender) => {
        const userName = sender.userName;
        const email = sender.userEmail;
        QueryDatabase.getGroupPhoneNumbers(groupId)
          .then((groupPhoneAndEmail) => {
            if ((priority === 'urgent') || (priority === 'critical')) {
              const groupEmails = FormatDatabaseResult.getGroupEmails(
                groupPhoneAndEmail);
              sendMail(groupEmails, priority);
            }
            if (priority === 'critical') {
              const groupPhoneNumbers = FormatDatabaseResult.getPhoneNumbers(
              groupPhoneAndEmail);
              sendSMS(groupPhoneNumbers);
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
      .catch(error => res.status(500).send({ error }));
  }

  /**
   * @description This method retrieves all message in a group
   * route GET: api/v1/getMessage/:groupId
   * @param {Object} req request object
   * @param {Object} res response object
   * @return {Object} json response contains all message in a group
   */
  static getMessage(req, res) {
    const groupId = req.params.groupId;
    return Promise.all([
      dbConfig.database().ref('Messages').child(groupId)
        .once('value', snapshot => snapshot.val())
    ])
      .then(response => res.status(200).send({ response }))
      .catch(error => res.status(500).send({ error }));
  }
}

