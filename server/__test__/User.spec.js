process.env.NODE_ENV = 'test';
import chai from 'chai';
import assert from 'assert';
import chaiHttp from 'chai-http';
import User from '../helper/User';
import UserMockData from '../__mock__/UserMockData';

chai.should();
const expect = chai.expect;
chai.use(chaiHttp);


describe('User:', () => {
  const userId = 'vQpwPkqYQnNjLbcDZEWAdTlNtlf2';
  describe('details function', () => {
    it('should return userdetails of the userId', (done) => {
      User.details(userId).then((res) => {
        assert.equal(res, UserMockData.userDetails);
        expect(res).to.be.an('object');
      });
      done();
    });
  });

  describe('name function', () => {
    const userName = 'sheridan rempel i';
    it('should return true if userName already exist',
    () => {
      User.checkUser(userName).then((res) => {
        expect(res).to.be.a(true);
      });
    });
    it('should return false if userName does not exist',
      () => {
        User.checkUser('kilimanjaro').then((res) => {
          expect(res).to.be.a(false);
        });
      });
  });

  describe('normalize Username function', () => {
    const userName = 'sheridan rempel i';
    it('should return a normalize value of userName',
      () => {
        assert.equal(User.normalizeUsername(userName), 'Sheridan rempel i');
      });
  });
});
