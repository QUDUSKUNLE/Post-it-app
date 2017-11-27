import chai from 'chai';
import chaiHttp from 'chai-http';
import formatDatabaseResult from '../utils/FormatDatabaseResult';
import formatDatabaseMockData from '../__mock__/formatDatabaseMockData';
import 'babel-polyfill';
chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

// Test formatDatabaseResult Class
describe('formatDatabaseResult class', () => {
  describe('should', () => {
    const groupEmails = formatDatabaseResult.getGroupEmails(
      formatDatabaseMockData.getEmailPhoneNumbers);
    it('have a function called getGroupEmails', () => {
      expect(formatDatabaseResult.getGroupEmails).to.be.a('function');
    });

    it(`should return a string of emails in a group when getGroupEmails
    function is called`, () => {
      expect(groupEmails).to.be.a('string');
    });
    it('not return an empty string', () => {
      expect(groupEmails).not.to.have.length(0);
    });
  });

  describe('should', () => {
    const phoneNumbers = formatDatabaseResult.getPhoneNumbers(
      formatDatabaseMockData.getEmailPhoneNumbers);
    it('have a function called getPhoneNumbers', () => {
      expect(formatDatabaseResult.getPhoneNumbers).to.be.a('function');
    });
    it(`should return an array of phoneNumbers in a group when getPhoneNumbers
    function is called`, () => {
      expect(phoneNumbers).to.be.an('array');
    });
    it('not return an empty array', () => {
      expect(phoneNumbers).not.to.have.length(0);
    });
  });

  describe('should', () => {
    it('have a function called searchUser', () => {
      expect(formatDatabaseResult.searchResult).to.be.a('function');
    });
    it('return an object when searchUser function is called', () => {
      expect(formatDatabaseResult.searchResult(
        formatDatabaseMockData.searchUser)).to.be.an('array');
    });
    it('not return an empty array', () => {
      expect(formatDatabaseResult.searchResult(
        formatDatabaseMockData.searchUser)).not.to.have.length(0);
    });
  });
});
