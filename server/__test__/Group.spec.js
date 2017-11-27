process.env.NODE_ENV = 'test';
import chai from 'chai';
import chaiHttp from 'chai-http';
import Group from '../helper/Group';

chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

// Test for Group
describe('Test for methods in helper/Group:', () => {
  const groupId = '-Kz5garRTF4ZXikiucJf';
  describe('emailPhoneNumbers method', () => {
    it('to be defined', () => {
      Group.emailPhoneNumbers(groupId).then((res) => {
        expect(res).to.be.an('object');
      });
    });

    it('is expected to be a function', () => {
      expect(Group.emailPhoneNumbers).to.be.a('function');
    });
  });

  describe('name method', () => {
    it('helps to get the name of a group', () => {
      Group.name(groupId).then((res) => {
        expect(res).to.be.an('object');
      });
    });
  });
});
