
import chai from 'chai';
import chaiHttp from 'chai-http';
import sendMail from '../utils/sendMail';

process.env.NODE_ENV = 'test';

chai.should();
chai.use(chaiHttp);

describe('sendMail', () => {
  // Test for SendMail
  describe('function', () => {
    it('is expected to be a function', () => {
      sendMail.should.be.a('function');
    });
  });
});
