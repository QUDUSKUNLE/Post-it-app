process.env.NODE_ENV = 'test';
import chai from 'chai';
import assert from 'assert';
import chaiHttp from 'chai-http';
import Group from '../helper/Group';
import groupMockData from '../__mock__/groupMockData';

chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

// Test for Group
describe('Group:', () => {
  const groupId = '-Kz5garRTF4ZXikiucJf';
  describe('emailPhoneNumbers function', () => {
    it('should return array of emailPhoneNumbers', (done) => {
      Group.emailPhoneNumbers(groupId).then((res) => {
        assert.equal(res, groupMockData.getEmailPhoneNumbers);
        expect(res).to.be.an('array');
      });
      done();
    });

    it('is expected to be a function', () => {
      expect(Group.emailPhoneNumbers).to.be.a('function');
    });
  });

  describe('name function', () => {
    it('should return the name of a group with given groupId', (done) => {
      Group.name(groupId).then((res) => {
        expect(res).to.be.an('object');
      });
      done();
    });
    it('is expected to be a function', () => {
      expect(Group.emailPhoneNumbers).to.be.a('function');
    });
  });
});
