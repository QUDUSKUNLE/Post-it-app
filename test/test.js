process.env.NODE_ENV = 'test';
import assert from 'assert';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server/server.js';


const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);


describe('PostIt', () => {
  it('allows anyone to visit its site', (done) => {
    chai.request(server)
      .get('http:127.0.0.1:8080')
      .end((err, res) => {
        res.should.have.status(200);
        assert.equal(200, res.statusCode);
        done();
      });
  });
  // Sign Up Route
  it('should allow new user`s to signup', (done) => {
    const newUser = {
      email: 'Askesaaaa@gmail.com',
      password: 'kawthar',
      confirmPassword: 'kawthar',
      username: 'Joke'
    };
    chai.request(server)
      .post('/signup')
      .send(newUser)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('should not already signed up to registered again', (done) => {
    const newUser = {
      email: 'kawthar@gmail.com',
      password: 'kawthar',
      confirmPassword: 'kawthar',
      username: 'Joke'
    };
    chai.request(server)
      .post('/signup')
      .send(newUser)
      .end((err, res) => {
        assert.equal('The email address is already in use by another account.',
          res.body.error.message);
        assert.equal('auth/email-already-in-use', res.body.error.code);
        res.should.have.status(502);
        res.body.should.be.a('object');
        done();
      });
  });


  // Sign In Route
  it('should allow a registered user sign in successfully', (done) => {
    const registeredUser = {
      email: 'kawthar@gmail.com',
      password: 'kawthar'
    };
    chai.request(server)
      .post('/signin')
      .send(registeredUser)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        expect(res.body).to.not.have.property('uID');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.eql('User Signed in successfully');
        done();
      });
  });

  it('should flagg error for a wrong password', (done) => {
    const registeredUser = {
      email: 'kawthar@gmail.com',
      password: 'kawtha'
    };
    chai.request(server)
      .post('/signin')
      .send(registeredUser)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        expect(res.body).to.not.have.property('uID');
        done();
      });
  });

  it('should flagg error for a wrong email address', (done) => {
    const registeredUser = {
      email: 'kawthajjjjjj@gmail.com',
      password: 'kawthar'
    };
    chai.request(server)
      .post('/signin')
      .send(registeredUser)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        expect(res.body).to.not.have.property('uID');
        expect(res.body.error.code).to.equal('auth/user-not-found');
        expect(res.body.error.message).to.equal('There is no user record ' +
        'corresponding to this identifier. The user may have been deleted.');
        done();
      });
  });

  it('should flagg error for an empty email address', (done) => {
    const registeredUser = {
      email: '',
      password: 'kawthar'
    };
    chai.request(server)
      .post('/signin')
      .send(registeredUser)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        expect(res.body.error.code).to.equal('auth/invalid-email');
        expect(res.body.error.message).to.equal('The email address is badly' +
        ' formatted.');
        done();
      });
  });

  // Sign Out Route
  it('should allow a user sign out successfully', (done) => {
    chai.request(server)
      .post('/signout')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.eql('User`s signed-out successfully.');
        done();
      });
  });


  // Password Reset Route
  it('should allow registered user`s to reset their passwords', (done) => {
    const userEmail = { email: 'kawthar@gmail.com' };
    chai.request(server)
      .post('/passwordreset')
      .send(userEmail)
      .end((err, res) => {
        console.log(res.body.error.code);
        res.body.should.be.a('object');
        done();
      });
  });


  it('should flag error for a wrongly formatted password', (done) => {
    const userEmail = { email: 'user.gmail.com' };
    chai.request(server)
      .post('/passwordreset')
      .send(userEmail)
      .end((err, res) => {
        assert.equal(404, res.statusCode);
        assert.equal('The email address is badly formatted.',
          res.body.error.message);
        expect(res.body).to.have.property('error');
        res.body.should.be.a('object');
        done();
      });
  });

  it('should throw an error if email is not found', (done) => {
    const userEmail = { email: 'user@gmail.com' };
    chai.request(server)
      .post('/passwordreset')
      .send(userEmail)
      .end((err, res) => {
        assert.equal(404, res.statusCode);
        expect(typeof res.body.message).not.be.a('number');
        assert.equal('There is no user record corresponding ' +
        'to this identifier. The user may have been deleted.',
        res.body.error.message);
        expect(res.body.error).to.have.property('message');
        res.body.should.be.a('object');
        done();
      });
  });

  // User's should be able to create grpoup
  it('should not a user`s that is not sign in to create groups', (done) => {
    const groupName = { group: 'andela', uId: 'jakljascjsCKsaldjakljcaks' };
    chai.request(server)
      .post('/creategroup')
      .send(groupName)
      .end((err, res) => {
        assert.equal(401, res.statusCode);
        expect(res.body).to.have.property('err');
        assert.equal('User not signed iiii!', res.body.err);
        assert.equal('PERMISSION_DENIED', res.body.error.code);
        res.body.should.be.a('object');
        done();
      });
  });
});
