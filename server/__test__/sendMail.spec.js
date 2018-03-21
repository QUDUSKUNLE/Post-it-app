
import chai from 'chai';
import chaiHttp from 'chai-http';
import sendMail from '../utils/sendMail';

process.env.NODE_ENV = 'test';

chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

// Test for SendMail
describe('sendMail', () => {
  it('is expected to be a function', () => {
    expect(sendMail).to.be.a('function');
  });
  it('should send mail when called', () => {
    sendMail('quduskunle@gmail.com', 'urgent');
  });
});
