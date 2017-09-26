import axios from 'axios';

/**
 * @function createGroup
 * @param {object} groupName - { andela }
 * @returns {object} object
 */
export const userCreateNewGroup = (groupName) =>
  axios.post('/userCreateNewGroup', groupName);

/**
 * @function addMember
 * @param {object} member - { member }
 * @returns {object} object
 */
export const addMember = (member) => axios.post('/group/member', member);
