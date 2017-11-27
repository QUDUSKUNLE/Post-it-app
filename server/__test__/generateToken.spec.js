import chai from 'chai';
import chaiHttp from 'chai-http';
import generateToken from '../utils/generateToken';
import generateTokenMockData from '../__mock__/generateTokenMockData';

chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

// Test for generateToken
describe('generateToken', () => {
  const token = generateToken(generateTokenMockData.userId,
    generateTokenMockData.email);
  it('is expected to be a function', () => {
    expect(generateToken).to.be.a('function');
  });
  it('should generate a token when called', () => {
    expect(typeof token).to.be.an('string');
  });

  it('should generate a token with a certain length', () => {
    expect(token).not.to.have.length(0);
  });
});
