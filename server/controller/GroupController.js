import moment from 'moment';
import values from 'object.values';
import admin from '../firebaseSDK/firebaseConfiguration';
import dbConfig from '../config/index';
import Helper from '../helper/helper';

/**
 * @description This class create and read functions for group
 * @class GroupController
 */
export default class GroupController {

  /**
   * @description This method create new group for user
   * route POST: api/v1/createGroup
   * @param {Object} req request object
   * @param {Object} res response object
   * @return {Object} json response containing creating new group
   */
  static createGroup(req, res) {
    const groupName = req.body.group;
    const idToken = req.body.token;
    const group = groupName.toLowerCase();
    admin.auth().verifyIdToken(idToken)
      .then((decodedToken) => {
        const userId = decodedToken.uid;
        admin.database().ref(`UserGroups/${userId}`).child(group)
          .once('value', (snapshot) => {
            if (!snapshot.exists()) {
              admin.database().ref('Groups').push({
                group,
                time: moment().format('llll')
              })
              .then((response) => {
                admin.database().ref(`UserGroups/${userId}`).child(group)
                  .set(response.key);
                admin.database().ref(`GroupMember/${response.key}`)
                  .child(userId).set(decodedToken.name);
                admin.database().ref(`GroupPhoneAndEmail/${response.key}`)
                  .child(userId).set({
                    phoneNumber: decodedToken.phone_number,
                    email: decodedToken.email
                  });
              })
              .then(() => res.status(200).send({
                message: 'Group created successfully' }));
            } else {
              res.status(403).send({ error: 'Group already exists' });
            }
          });
      })
      .catch(error => res.status(401).send({ error }));
  }

  /**
   * @description This method retrieves allRegisteredUsers
   * route GET: api/v1/getAllRegisteredUsers
   *
   * @param {Object} req request object
   * @param {Object} res response object
   * @return {Object} json response containing all registerdUsers
   */
  static getAllRegisteredUsers(req, res) {
    const idToken = req.params.token;
    if (idToken === undefined) {
      res.status(403).send({
        error: {
          code: 'auth/argument-error',
          message: 'User`s not signed in.'
        }
      });
    } else {
      admin.auth().verifyIdToken(idToken)
        .then((decodedToken) => {
          if (decodedToken) {
            admin.database().ref('users')
              .once('value', (snapshot) => {
                if (snapshot.val() != null) {
                  snapshot.val();
                }
              }).then(response => res.status(200).send({ response }));
          }
        })
        .catch(error => res.status(401).send({ error }));
    }
  }

  /**
   * @description This method retrieves allRegisteredUsers
   * route GET: api/v1/getMembers/:groupId
   * @param {Object} req request object
   * @param {Object} res response object
   * @return {Object} json response contains all members of a group
   */
  static getMembersOfGroup(req, res) {
    const groupId = req.params.groupId;
    const userId = req.user.uid;
    if (userId === undefined) {
      res.status(401).send({ error: 'User is not signed in' });
    } else {
      Helper.getGroupName(groupId).then((groupName) => {
        if (groupName) {
          return Promise.all([
            dbConfig.database().ref('GroupMember').child(groupId).once('value',
              snapshot => snapshot.val()),
            groupId,
            groupName[0]
          ])
          .then(response => res.status(200).send({ response }))
          .catch(error => res.status(403).send({ error }));
        }
      });
    }
  }

  /**
   * @description This method retrieves all user group
   * route GET: api/v1/getgroups/:userId
   * @param {Object} req request object
   * @param {Object} res response object
   * @return {Object} json response contains all user group
   */
  static getUsersGroups(req, res) {
    const userId = req.params.userId;
    const uId = req.user.uid;
    if (uId === undefined) {
      res.status(401).send({ error: 'User is not signed in' });
    } else {
      return Promise.all([
        dbConfig.database().ref('UserGroups').child(userId).once('value',
          snapshot => snapshot.val())
      ])
      .then(response => res.status(200).send({ response }))
      .catch(error => res.status(403).send({ error }));
    }
  }

  /**
   * @description This method add member to a group
   * route POST: api/v1/addMembers/:groupId
   * @param {Object} req request object
   * @param {Object} res response object
   * @return {Object} json response contains add member response
   */
  static addMemberToGroup(req, res) {
    const memberId = req.body.memberId;
    const group = req.body.group;
    const groupId = req.params.groupId;
    const userId = req.user.uid;
    if (userId === undefined) {
      res.status(400).send({
        error: 'User not signed in'
      });
    } else {
      Helper.getUserEmailAndPhoneNumber(memberId)
        .then((response) => {
          const memberDetails = values(response)[0];
          dbConfig.database().ref(`UserGroups/${memberId}`).child(group)
            .set(groupId);
          dbConfig.database().ref(`GroupMember/${groupId}`).child(memberId)
            .set(memberDetails.userName);
          dbConfig.database().ref(`GroupPhoneAndEmail/${groupId}`)
            .child(memberId).set({
              phoneNumber: memberDetails.phone_Number,
              email: memberDetails.userEmail
            });
          res.status(200).send({ response: 'Add member successfully' });
        }).catch(error => res.status(403).send({ error }));
    }
  }
}
