import axios from 'axios';

/**
 * @function createGroup
 * @param {object} groupName - { andela }
 * @returns {object} object
 */
export const createGroup = (groupName) => axios.post('/creategroup', groupName);

/**
 * @function deleteAccount
 * @returns {object} object
 */
export const deleteAccount = () => axios.post('/delete');

/**
 * @function addMember
 * @param {object} member - { member }
 * @returns {object} object
 */
export const addMember = (member) => axios.post('/group/member', member);
