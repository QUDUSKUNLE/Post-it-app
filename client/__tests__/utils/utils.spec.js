import { validatePassword } from '../../client/src/js/utils/utils.js';

test('Validate input password', () => {
  expect(validatePassword('adekunle123K@')).toBeTruthy();
  expect(validatePassword('adekunle')).toBeFalsy();
});

test('Password input should not contain only numbers', () => {
  expect(validatePassword('12345678')).toBeFalsy();
});

test('Password input should not be lower case all through', () => {
  expect(validatePassword('12345678')).toBeFalsy();
});

test('Password input should not be Uppercase  all through', () => {
  expect(validatePassword('ABCDEFGHIJ')).toBeFalsy();
});

test('Password input should be at least 8 characters', () => {
  expect(validatePassword('ABCDEFGHIJ')).toBeFalsy();
});

