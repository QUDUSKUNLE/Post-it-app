import moment from 'moment';
import values from 'object.values';
import dbConfig from '../config/dbConfig';
import Helper from '../helper/Helper.js';

/**
 * @export
 * @class Groups
 */
export default class Groups {

  /**
  * @param {Object} req requset object
  * @param {Object} res response object
  * @return {Object} contains server createGroup response
  */
  static createGroup(req, res) {
    const groupName = req.body.group;
    const userId = req.user.uid;
    const group = groupName.toLowerCase();
    if (userId !== undefined) {
      dbConfig.database().ref(`UserGroups/${userId}`).child(group)
        .once('value', (snapshot) => {
          if (!snapshot.exists()) {
            dbConfig.database().ref('Groups').push({
              group: group,
              time: moment().format('llll')
            })
            .then(response => {
              Helper.getUserEmailAndPhoneNumber(userId)
                .then(userEmailAndPhone => {
                  const userDetails = (values(userEmailAndPhone))[0];
                  dbConfig.database().ref(`UserGroups/${userId}`).child(group)
                    .set(response.key);
                  dbConfig.database().ref(`GroupMember/${response.key}`)
                    .child(userId).set(userDetails.userName);
                  dbConfig.database().ref(`GroupPhoneAndEmail/${response.key}`)
                    .child(userId).set({
                      phoneNumber: userDetails.phone_Number,
                      email: userDetails.userEmail
                    });
                }).then(() => res.status(200).send({
                  message: 'Group created successfully' }));
            });
          } else {
            res.status(403).send({ error: 'Group already exists' });
          }
        });
    } else {
      res.status(401).send({ error: 'User is not signed in' });
    }
  }

  /**
   * @static
   * @param {any} req
   * @param {any} res
   * @memberof Groups
   */
  static getAllRegisteredUsers(req, res) {
    Promise.all([
      dbConfig.database().ref('users')
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
   * @static
   * @param {any} req
   * @param {any} res
   * @memberof Groups
   */
  static getMembersOfGroup(req, res) {
    const groupId = req.params.groupId;
    const userId = req.user.uid;
    if (userId === undefined) {
      res.status(401).send({ error: 'User is not signed in' });
    } else {
      Helper.getGroupName(groupId).then(groupName => {
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
   * @static
   * @param {any} req
   * @param {any} res
   * @returns
   * @memberof Groups
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
   * @static
   * @param {any} req
   * @param {any} res
   * @memberof Groups
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
