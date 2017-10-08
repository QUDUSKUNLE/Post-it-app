/**
 * @function validatePassword
 * @param {Object} password -
 * @returns {bool} validated
 */
export const validatePassword = (password) => {
  if (
password.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
  ) {
    return true;
  }
};

/**
 * @function getMembersOfAGroup
 * @param {Object} data -
 * @returns {Object} title
 */
export const getMembersOfAGroup = (data) => {
  const arrayOfUsers = Object.values((data.response)[0]).filter(i =>
    Object.values((data.response)[0]).indexOf(i) > 0);
  return arrayOfUsers.map(j => Object.values(j));
};


/**
 * @function getAllUsers
 * @param {Object} objectOfUsers -
 * @returns {Object} allUsers
 */
export const getAllUsers = (objectOfUsers) => {
  const arrayOfAllUsers = Object.values((objectOfUsers.response[0]));
  const allUsers = [];
  for (let i = 0; i < arrayOfAllUsers.length; i++) {
    allUsers.push((Object.values(arrayOfAllUsers[i]))[0].user);
  }
  return allUsers;
};

/**
 * @function getAllGeneralUsers
 * @param {Object} data -
 * @returns {Object} allRegisteredUsers
 */
export const getAllGeneralUsers = (data) => {
  const arrayOfUsers = Object.values((data.response)[0]).map(x =>
    Object.values(x));
  const allRegisteredUsers = arrayOfUsers.map(m => m[0].user);
  return allRegisteredUsers;
};

/**
 * @function arrayOfGeneralMessage
 * @param {Object} data -
 * @returns {Object} GeneralMessage
 */
export const arrayOfGeneralMessage = (data) => {
  const n = (data.response).map(dataVal => Object.values(dataVal));
  let index = 0;
  const GeneralMessage = [];
  while (index < n[0].length) {
    const x = Object.values((n[0])[index]);
    index += 1;
    let jIndex = 0;
    while (jIndex < x.length) {
      GeneralMessage.push(x[jIndex]);
      jIndex += 1;
    }
  }
  return GeneralMessage;
};

/**
 * @function arrayOfGroupMessage
 * @param {Object} data -
 * @returns {Object} GroupMessage
 */
export const getGroupMessages = (data) => {
  let GroupMessage;
  if (data[0] === null) {
    GroupMessage = [];
  } else {
    GroupMessage = Object.values(data[0]);
  }
  return GroupMessage;
};


/**
 * @function getGroups
 * @param {Object} data -
 * @returns {Object} getGroups
 */
export const getGroups = (data) => {
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
