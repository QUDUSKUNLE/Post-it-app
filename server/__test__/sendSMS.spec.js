import chai from 'chai';
import assert from 'assert';
import chaiHttp from 'chai-http';
import sendSMS from '../utils/sendSMS';
process.env.NODE_ENV = 'test';

chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

 // Test for sendSMS
describe('sendSMS', () => {
  it('is expected be a function', () => {
    expect(sendSMS).to.be.a('function');
  });

  it('should send SMS when called', (done) => {
    sendSMS(['08052327990']).then((res) => {
      assert.equal('Sent', res[0].body.status);
      done();
    });
  });
});
