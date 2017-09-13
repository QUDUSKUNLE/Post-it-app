process.env.NODE_ENV = 'test';
import assert from 'assert';
import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import server from '../server/server.js';

chai.should();
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
      email: faker.internet.email(),
      password: 'kawthar',
      confirmPassword: 'kawthar',
      username: faker.name.findName()
    };
    chai.request(server)
      .post('/signup')
      .send(newUser)
      .end((err, res) => {
        res.should.have.status(200);
        assert.equal('Registration successful and verification ' +
        'email sent to your email', res.body.message);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('response');
        res.body.should.be.a('object');
        done();
      });
  });
});

describe('PostIt', () => {
  it('should not signed up already registered user', (done) => {
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

  it('should flag error for bad input email', (done) => {
    const newUser = {
      email: 'jksdzfkd',
      password: 'kawthar',
      confirmPassword: 'kawthar',
      username: 'Joke'
    };
    chai.request(server)
      .post('/signup')
      .send(newUser)
      .end((err, res) => {
        assert.equal('The email address is badly formatted.',
          res.body.error.message);
        assert.equal('auth/invalid-email', res.body.error.code);
        res.should.have.status(502);
        res.body.should.be.a('object');
        done();
      });
  });

  it('should flag error for bad input format', (done) => {
    const newUser = {
      email: 'kunle@gmail.com',
      password: '',
      confirmPassword: 'kawthar',
      username: 'Joke'
    };
    chai.request(server)
      .post('/signup')
      .send(newUser)
      .end((err, res) => {
        assert.equal('The password must be 6 characters long or more.',
          res.body.error.message);
        assert.equal('auth/weak-password', res.body.error.code);
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
        assert.equal('auth/wrong-password', res.body.error.code);
        res.body.should.be.a('object');
        assert.equal('The password is invalid or the user does ' +
          'not have a password.', res.body.error.message);
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

  // Password Reset Route
  it('should allow registered user`s to reset their passwords', (done) => {
    const userEmail = { email: 'kawthar@gmail.com' };
    chai.request(server)
      .post('/passwordreset')
      .send(userEmail)
      .end((err, res) => {
        assert.equal(404, res.statusCode);
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
  it('should allow registered user`s to create groups', (done) => {
    const group = { group: 'andela', uId: 'annajadsaknjd1' };
    chai.request(server)
      .post('/creategroup')
      .send(group)
      .end((err, res) => {
        assert.equal(200, res.statusCode);
        assert.equal('Group created succesfully', res.body.message);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('response');
        done();
      });
  });

  it('should allow user to get all groups he belongs to', (done) => {
    const uID = { uID: 'annajadsaknjd1' };
    chai.request(server)
      .post('/getgroups')
      .send(uID)
      .end((err, res) => {
        assert.equal('object', typeof (res.body.response));
        assert.equal(200, res.statusCode);
        expect(res.body).to.have.property('response');
        done();
      });
  });

  it('should get all register user`s onmounting broadcastcomponent', (done) => {
    chai.request(server)
      .post('/generallist')
      .end((err, res) => {
        assert.equal(200, res.statusCode);
        assert.equal('object', typeof (res.body.response));
        done();
      });
  });

  it('should get all member of a particular group', (done) => {
    const group = { group: 'andela' };
    chai.request(server)
      .post('/memberlist')
      .send(group)
      .end((err, res) => {
        assert.equal(200, res.statusCode);
        assert.equal('object', typeof (res.body.response));
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('response');
        done();
      });
  });

  it('should throw error for no group', (done) => {
    const group = { group: '' };
    chai.request(server)
      .post('/memberlist')
      .send(group)
      .end((err, res) => {
        assert.equal(500, res.statusCode);
        done();
      });
  });

  it('should all registered user`s to add members to a group', (done) => {
    const groupName = { group: 'andela', member: 'micheal' };
    chai.request(server)
      .post('/group/member')
      .send(groupName)
      .end((err, res) => {
        assert.equal(200, res.statusCode);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('response');
        done();
      });
  });

  it('should allow signed in user`s to send message to general channel',
    (done) => {
      const message = { message: 'Hello everyone' };
      chai.request(server)
        .post('/sendGeneralMessage')
        .send(message)
        .end((err, res) => {
          res.should.have.status(200);
          assert.equal(200, res.statusCode);
          expect(res.body).to.have.property('response');
          done();
        });
    });

  it('User`s should be able to get all GeneralMessage', (done) => {
    chai.request(server)
      .post('/getGeneralMessage')
      .end((err, res) => {
        assert.equal(200, res.statusCode);
        expect(res.body).to.have.property('response');
        res.body.should.be.a('object');
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

  it('User`s should be able to get all GeneralMessage', (done) => {
    chai.request(server)
      .post('/getGeneralMessage')
      .end((err, res) => {
        assert.equal(400, res.statusCode);
        assert.equal('PERMISSION_DENIED', res.body.error.code);
        expect(res.body).to.have.property('error');
        done();
      });
  });


  it('should not allow already signed-out user`s to add member to group',
    (done) => {
      const groupName = { group: 'andela', member: 'micheal' };
      chai.request(server)
        .post('/group/member')
        .send(groupName)
        .end((err, res) => {
          assert.equal(500, res.statusCode);
          done();
        });
    });

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

  it('should not allow user access groups when signed out', (done) => {
    const uID = { uID: 'annajadsaknjd1' };
    chai.request(server)
      .post('/getgroups')
      .send(uID)
      .end((err, res) => {
        assert.equal(500, res.statusCode);
        done();
      });
  });
});
