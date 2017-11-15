import Jusibe from 'jusibe';
import dotenv from 'dotenv';

dotenv.config();
const key = process.env.PUBLIC_KEY;
const token = process.env.ACCESS_TOKEN;
const jusibe = new Jusibe(key, token);

/**
 * @description This method sends SMS
 *
 * @param {Object} phoneNumbers request object
 *
 * @return {Object} response from Jusibe server
 */
export default (phoneNumbers) => {
  const payloads = phoneNumbers.map(number => (
    {
      to: number,
      from: 'PostIt App',
      message: 'Hello, you have an important message.'
    }
  ));
  return Promise.all(
    payloads.map(payload => jusibe.sendSMS(payload)));
};

