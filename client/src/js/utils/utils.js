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
 * @function getUserGroups
 * @param {Object} data -
 * @returns {Object} getGroups
 */
export const getUserGroups = (data) => {
  let getGroups;
  if ((data.response)[0] === null) {
    getGroups = [];
  } else {
    getGroups = Object.keys(((data.response)[0]));
  }
  return getGroups;
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
export const getArrayOfGroupMessage = data => {
  let arrayOfGroupMessage;
  if ((data.response)[0] === null) {
    arrayOfGroupMessage = [];
  } else {
    arrayOfGroupMessage = Object.values((data.response)[0]);
  }
  return arrayOfGroupMessage;
};
