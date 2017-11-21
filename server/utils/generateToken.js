import jwt from 'jsonwebtoken';

/**
 * @description This method sends SMS
 * @param {Object} userId request object
 * @param {Object} email request object
 * @return {string} token
 */
const generateToken = (userId, email) => {
  const Token = jwt.sign({ token: { userId, email } }, process.env.TOKEN_SECRET,
    { expiresIn: '24h' });
  return Token;
};
export default generateToken;
