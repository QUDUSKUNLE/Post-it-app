/**
 * @function helpgGetRegisteredUsers
 * @param {any} res -
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
 * @param {any} data -
 * @returns {any} GroupMessage
 */
export const helpGetGroupMessages = (data) => {
  let GroupMessage;
  if (data[0] === null) {
    GroupMessage = [];
  } else {
    GroupMessage = Object.values(data[0]);
  }
  return GroupMessage;
};


/**
 * @function helpGetGroups
 * @param {any} data -
 * @returns {any} group
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
 * @param {any} data -
 * @returns {any} groupMembers
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
