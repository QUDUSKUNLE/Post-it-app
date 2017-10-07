import dbConfig from '../config/dbConfig';

export const getUserEmailAndPhoneNumber = (userId) => Promise.all([
  dbConfig.database().ref('users').child(userId)
    .once('value', snapshot => snapshot.val())
]);
