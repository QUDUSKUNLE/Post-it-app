
export const validatePassword = (pass) => {
  let validated;
  if (pass.length < 6) {
    validated = true;
  } else {
    validated = false;
  }
  return validated;
};


// Get members of a group
export const getMembersOfAGroup = (data) => {
  const arrayOfUsers = Object.values((data.response)[0]).filter(i =>
    Object.values((data.response)[0]).indexOf(i) > 0);
  return arrayOfUsers.map(j => Object.values(j));
};

// Get All Users
export const getAllUsers = (objectOfUsers) => {
  const arrayOfAllUsers = Object.values((objectOfUsers.response[0]));
  const allUsers = [];
  for (let i = 0; i < arrayOfAllUsers.length; i++) {
    allUsers.push((Object.values(arrayOfAllUsers[i]))[0].user);
  }
  return allUsers;
};

// All groups perculiar to a user
export const getUserGroups = (data) => {
  let getGroups;
  if ((data.response)[0] === null) {
    getGroups = [];
  } else {
    getGroups = Object.keys(((data.response)[0]));
  }
  return getGroups;
};

// All registered Users
export const getAllGeneralUsers = (data) => {
  const arrayOfUsers = Object.values((data.response)[0]).map(x =>
    Object.values(x));
  const allRegisteredUsers = arrayOfUsers.map(m => m[0].user);
  return allRegisteredUsers;
};
