import chai from 'chai';
import chaiHttp from 'chai-http';
import sendSMS from '../utils/sendSMS';
process.env.NODE_ENV = 'test';

chai.should();

chai.use(chaiHttp);

 // Test for sendSMS
describe('sendSMS', () => {
  describe('function', () => {
    it('should be a function', () => {
      sendSMS.should.be.a('function');
    });
  });
});
