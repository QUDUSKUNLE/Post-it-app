import moment from 'moment';
import dbConfig from '../config/dbConfig';

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
}

