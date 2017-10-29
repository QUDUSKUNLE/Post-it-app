import toastr from 'toastr';
/**
 * @function helpgGetRegisteredUsers
 * @param {Object} res -Object of Arrays from Firebase Database
 * @returns {Object} allUsers
 */
export const helpGetRegisteredUsers = (res) => {
  const users = Object.values(res.response[0]);
  let index = 0;
  const allUsers = [];
  let registeredUser;
  while (index < users.length) {
    registeredUser = Object.values(users[index]);
    allUsers.push({ [registeredUser[0].userId]: registeredUser[0].userName });
    index++;
  }
  return allUsers;
};

/**
 * @function helpGetGroupMessages
 * @param {object} data - Array of Object from Firebase Database
 * @returns {object} object Array of Object of GroupMessage
 */
export const helpGetGroupMessages = (data) => {
  let GroupMessage;
  if (data[0] === null) {
    toastr.warning('No Message Found');
    GroupMessage = [];
  } else {
    GroupMessage = Object.values(data[0]);
  }
  return GroupMessage;
};


/**
 * @function helpGetGroups
 * @param {object} data -
 * @returns {object} Array of object of user`s groups
 */
export const helpGetGroups = (data) => {
  const groupNames = Object.keys(data[0]);
  const groupKeys = Object.values(data[0]);
  let index = 0;
  const groups = [];
  while (index < groupNames.length) {
    groups.push({ [groupNames[index]]: groupKeys[index] });
    index++;
  }
  return groups;
};

/**
 * @function helpGetGroupMembers
 * @param {object} data -
 * @returns {object} array of object of members of a group
 */
export const getGroupMembers = (data) => {
  const memberId = Object.keys(data[0]);
  const memberName = Object.values(data[0]);
  let index = 0;
  const groupMembers = [];
  while (index < memberId.length) {
    groupMembers.push({ [memberId[index]]: memberName[index] });
    index++;
  }
  return groupMembers;
};
