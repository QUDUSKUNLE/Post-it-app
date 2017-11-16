import jwt from 'jsonwebtoken';

/**
 * @description This method sends SMS
 * @param {Object} userId request object
 * @param {Object} email request object
 * @return {string} token
 */
const sendToken = (userId, email) => {
  const Token = jwt.sign({ data: { userId, email } }, process.env.TOKEN_SECRET,
    { expiresIn: '24h' });
  return Token;
};
export default sendToken;
