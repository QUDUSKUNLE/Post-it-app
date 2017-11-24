process.env.NODE_ENV = 'test';
import chai from 'chai';
import chaiHttp from 'chai-http';
import User from '../helper/User';

chai.should();
const expect = chai.expect;
chai.use(chaiHttp);


describe('Test for methods in helper/User:', () => {
  const userId = 'vQpwPkqYQnNjLbcDZEWAdTlNtlf2';
  describe('details method', () => {
    it('helps to get details of a user from the database', () => {
      User.details(userId).then((res) => {
        expect(res).to.be.an('array');
      });
    });
  });

  describe('name method', () => {
    const userName = 'sheridan rempel i';
    it('helps to check the userName if its already exists in the database',
    () => {
      User.checkUser(userName).then((res) => {
        expect(res).to.be.a(true);
      });
    });
  });
});
