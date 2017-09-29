import moment from 'moment';
import dbConfig from '../config/dbConfig';
/**
* class Groups: controls all Groups routes
* @class Groups
*/
export default class Groups {

  /**
  * @param {Object} req requset object
  * @param {Object} res response object
  * @return {Object} contains server createGroup response
  */
  static createNewGroup(req, res) {
    const groupName = req.body.group;
    const userId = req.user.uid;
    const group = groupName.toLowerCase();
    if (userId !== undefined) {
      dbConfig.database().ref(`Group/${userId}`).child(group)
      .once('value', (snapshot) => {
        if (!snapshot.exists()) {
          dbConfig.database().ref(`Group/${userId}`).child(group).push({
            member: userId,
            time: moment().format('llll')
          })
          .then(response => res.status(200).send({
            message: 'Group created succesfully', response }))
          .catch(error => res.status(401).send({ error }));
        } else {
          res.status(400).send({ error: 'Group already exists' });
        }
      });
    } else {
      res.status(401).send({ error: 'User is not signed in' });
    }
  }

  /**
  * @param {Object} req requset object
  * @param {Object} res response object
  * @return {Object} contains server getUserGroups response
  */
  static getUserGroups(req, res) {
    const userId = req.user.uid;
    return Promise.all(
      [
        dbConfig.database().ref('Group').child(userId)
          .once('value', (snapshot) => {
            if (snapshot.val() != null) {
              snapshot.val();
            }
          })
      ])
      .then(response => res.status(200).send({ response }))
      .catch(error => res.status(500).send({ error }));
  }

  /**
  * @param {Object} req requset object
  * @param {Object} res response object
  * @return {Object} contains server getAllUsers response
  */
  static getAllUsers(req, res) {
    Promise.all([
      dbConfig.database().ref('Group/general').child('member')
        .once('value', (snapshot) => {
          if (snapshot.val() != null) {
            snapshot.val();
          }
        })
    ])
    .then(response => res.status(200).send({ response }))
    .catch(error => res.status(401).send({ error }));
  }

  /**
  * @param {Object} req requset object
  * @param {Object} res response object
  * @return {Object} contains server getGroupMembers response
  */
  static getGroupMembers(req, res) {
    const groupName = req.body.group;
    const userId = req.user.uid;
    return Promise.all(
      [
        dbConfig.database().ref(`Group/${userId}`).child(groupName)
          .once('value', (snapshot) => {
            if (snapshot.val() != null) {
              snapshot.val();
            }
          })
      ])
      .then(response => res.status(200).send({
        message: `Hey, here are members of the group ${groupName}`,
        response }))
      .catch(error => res.status(401).send(error));
  }

  /**
  * @param {Object} req requset object
  * @param {Object} res response object
  * @return {Object} contains server addGroupMember response
  */
  static addGroupMember(req, res) {
    const groupName = req.body.group;
    const groupMember = req.body.member;
    const userId = req.user.uid;
    const name = groupName.toLowerCase();
    return Promise.all(
      [
        dbConfig.database().ref(`Group/${userId}`).child(name).push({
          member: groupMember
        }),
        dbConfig.database().ref('Group').child(userId)
          .once('value', (get) => {
            if (get.val() != null) {
              get.val();
            }
          })
      ])
      .then(response => res.status(200).send({
        message: 'Member added successfully', response }))
      .catch(error => res.status(500).send({ message: 'Not authorized',
        error }));
  }
}
