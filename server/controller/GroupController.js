import moment from 'moment';
import dbConfig from '../config/dbConfig';
import User from '../helper/User';
import Group from '../helper/Group';

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
    const groupname = req.body.group;
    const { userId } = req.decoded.token;
    const groupName = groupname.toLowerCase();
    dbConfig.database().ref(`UserGroups/${userId}`).child(groupName)
      .once('value', (snapshot) => {
        if (!snapshot.exists()) {
          dbConfig.database().ref('Groups').push({
            group: groupName,
            time: moment().format('llll')
          })
            .then((response) => {
              User.details(userId)
                .then((userEmailAndPhone) => {
                  dbConfig.database().ref(`UserGroups/${userId}`)
                    .child(groupName).set(response.key);
                  dbConfig.database().ref(`GroupMember/${response.key}`)
                    .child(userId).set(userEmailAndPhone.userName);
                  dbConfig.database().ref(`GroupPhoneAndEmail/${response.key}`)
                    .child(userId).set({
                      phoneNumber: userEmailAndPhone.phone_Number,
                      email: userEmailAndPhone.userEmail
                    });
                }).then(() => res.status(201).send({
                  message: 'Group created successfully'
                }));
            });
        } else {
          res.status(409).send({ error: 'Group already exists' });
        }
      });
  }

  /**
   * @description This method retrieves allRegisteredUsers
   * route GET: api/v1/getMembers/:groupId
   * @param {Object} req request object
   * @param {Object} res response object
   * @return {Object} json response contains all members of a group
   */
  static getMembers(req, res) {
    const { groupId } = req.params;
    Group.name(groupId).then((groupName) =>
      Promise.all([
        dbConfig.database().ref('GroupMember').child(groupId)
          .once('value', snapshot => snapshot.val()),
        groupId,
        groupName[0]
      ])
        .then(response => res.status(200).send({ response }))
        .catch(error => res.status(403).send({ error })));
  }

  /**
   * @description This method retrieves all user group
   * route GET: api/v1/getgroups/:userId
   * @param {Object} req request object
   * @param {Object} res response object
   * @return {Object} json response contains all user group
   */
  static getUsersGroups(req, res) {
    const { userId } = req.decoded.token;
    return Promise.all([
      dbConfig.database().ref('UserGroups').child(userId).once('value',
        snapshot => snapshot.val())
    ])
      .then(response => res.status(200).send({ response }))
      .catch(error => res.status(403).send({ error }));
  }

  /**
   * @description This method add member to a group
   * route POST: api/v1/addMembers/:groupId
   * @param {Object} req request object
   * @param {Object} res response object
   * @return {Object} json response contains add member response
   */
  static addMemberToGroup(req, res) {
    const { memberId } = req.body;
    const { groupId } = req.params;
    User.details(memberId)
      .then((response) => {
        Group.name(groupId).then((group) => {
          // const groupName = group[0];
          dbConfig.database().ref('GroupMember').child(groupId)
            .once('value', (snapshot) => {
              if (snapshot.hasChild(memberId)) {
                res.status(409).send({ error: 'User`s already a member' });
              } else {
                dbConfig.database().ref(`UserGroups/${memberId}`)
                  .child(group[0]).set(groupId);
                dbConfig.database().ref(`GroupMember/${groupId}`)
                  .child(memberId).set(response.userName);
                dbConfig.database().ref(`GroupPhoneAndEmail/${groupId}`)
                  .child(memberId).set({
                    phoneNumber: response.phone_Number,
                    email: response.userEmail
                  });
                res.status(201).send({ response: 'Add member successfully' });
              }
            });
        });
      }).catch(error => res.status(500).send({ error }));
  }
}
