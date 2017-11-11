process.env.NODE_ENV = 'test';
import assert from 'assert';
import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import server from '../server.js';

chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

describe('PostIt', () => {
  it('allows anyone to visit the Homepage', (done) => {
    chai.request(server)
      .get('http:127.0.0.1:8080')
      .end((err, res) => {
        res.should.have.status(200);
        assert.equal(200, res.statusCode);
        done();
      });
  });

  // Sign Up Route
  it('Sign up route should throw error for a non validated password',
    (done) => {
      const newUser = {
        email: faker.internet.email(),
        password: 'kawthar',
        confirmPassword: 'kawthar',
        username: faker.name.findName(),
        phoneNumber: '08052327990'
      };
      chai.request(server)
        .post('/api/v1/signup')
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(403);
          assert.equal('Password should be at least 6 characters with a' +
            ' speacial character', res.body.error.code);
          done();
        });
    });

  it('Sign up route should throw 409 status code for signing up without email',
    (done) => {
      const newUser = {
        password: 'kawthar',
        confirmPassword: 'kawthar',
        username: faker.name.findName(),
        phoneNumber: '08052327990'
      };
      chai.request(server)
        .post('/api/v1/signup')
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(409);
          assert.equal('User email is required', res.body.error.code);
          done();
        });
    });

  // Sign Up Route
  it('sign up route should throw error for a non defined username', (done) => {
    const newUser = {
      email: faker.internet.email(),
      password: 'kawthar',
      confirmPassword: 'kawthar',
      phoneNumber: '08052327990'
    };
    chai.request(server)
      .post('/api/v1/signup')
      .send(newUser)
      .end((err, res) => {
        res.should.have.status(409);
        assert.equal('Username is required', res.body.error.code);
        done();
      });
  });

  // Sign Up Route
  it('sign up route should throw error for a username of length less than 2',
    (done) => {
      const newUser = {
        email: faker.internet.email(),
        password: 'kawthar@',
        confirmPassword: 'kawthar@',
        username: 'a',
        phoneNumber: '08052327990'
      };
      chai.request(server)
        .post('/api/v1/signup')
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(409);
          assert.equal('username should be at least 2 characters',
            res.body.error.code);
          done();
        });
    });

  it('sign up route should throw error for password that does not match',
    (done) => {
      const newUser = {
        email: faker.internet.email(),
        password: 'kawthar@',
        confirmPassword: 'kawthar',
        username: faker.name.findName(),
        phoneNumber: '08052327990'
      };
      chai.request(server)
        .post('/api/v1/signup')
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(403);
          assert.equal('Password does not match', res.body.error.code);
          done();
        });
    });

  it('sign up route should throw error for wrong phoneNumber', (done) => {
    const newUser = {
      email: faker.internet.email(),
      password: 'kawthar@',
      confirmPassword: 'kawthar@',
      username: faker.name.findName(),
      phoneNumber: '0809289312'
    };
    chai.request(server)
      .post('/api/v1/signup')
      .send(newUser)
      .end((err, res) => {
        res.should.have.status(409);
        assert.equal('Incorect phoneNumber', res.body.error.code);
        done();
      });
  });

  it('sign up route should throw error for invalid phoneNumber', (done) => {
    const newUser = {
      email: faker.internet.email(),
      password: 'kawthar@',
      confirmPassword: 'kawthar@',
      username: faker.name.findName(),
      phoneNumber: '0809289312123'
    };
    chai.request(server)
      .post('/api/v1/signup')
      .send(newUser)
      .end((err, res) => {
        res.should.have.status(409);
        assert.equal('Enter a valid phone Number', res.body.error.code);
        done();
      });
  });
  it('sign up route should throw error for a badly formatted email', (done) => {
    const newUser = {
      email: 'qudus.com',
      password: 'kawthar@',
      confirmPassword: 'kawthar@',
      username: faker.name.findName(),
      phoneNumber: '08092893120'
    };
    chai.request(server)
      .post('/api/v1/signup')
      .send(newUser)
      .end((err, res) => {
        res.should.have.status(409);
        assert.equal('Email is badly formatted', res.body.error.code);
        done();
      });
  });

  it('sign up route should allow new users to sign up', (done) => {
    const newUser = {
      email: faker.internet.email(),
      password: 'Ka123@',
      confirmPassword: 'Ka123@',
      username: faker.name.findName(),
      phoneNumber: '08092893120'
    };
    chai.request(server)
      .post('/api/v1/signup')
      .send(newUser)
      .end((err, res) => {
        res.should.have.status(201);
        expect((res.body.response)[1]).to.have.property('token');
        assert.equal('User`s sign up successfully', res.body.message);
        done();
      });
  });

  it('sign up route should not sign up already registered user', (done) => {
    const newUser = {
      email: 'kawthar@gmail.com',
      password: 'kawthar@',
      confirmPassword: 'kawthar@',
      username: 'Joke',
      phoneNumber: '08092893120'
    };
    chai.request(server)
      .post('/api/v1/signup')
      .send(newUser)
      .end((err, res) => {
        assert.equal('The email address is already in use by another account.',
          res.body.error.message);
        assert.equal('auth/email-already-in-use', res.body.error.code);
        res.should.have.status(409);
        done();
      });
  });
});

// Sign In Route
describe('PostIt', () => {
  it('sign in route should throw error for providing wrong password',
    (done) => {
      const registeredUser = {
        email: 'kawthar@gmail.com',
        password: 'Kawthar@'
      };
      chai.request(server)
        .post('/api/v1/signin')
        .send(registeredUser)
        .end((err, res) => {
          res.should.have.status(400);
          assert.equal('auth/wrong-password', res.body.error.code);
          assert.equal('The password is invalid or the user does' +
            ' not have a password.', res.body.error.message);
          done();
        });
    });

  it('sign in route should throw error for not define an email',
    (done) => {
      const registeredUser = {
        password: 'kawthar@'
      };
      chai.request(server)
        .post('/api/v1/signin')
        .send(registeredUser)
        .end((err, res) => {
          res.should.have.status(409);
          assert.equal('User email is required', res.body.error.code);
          done();
        });
    });

  it('sign in route should throw error for a badly formatted email',
    (done) => {
      const registeredUser = {
        email: 'kunle.com',
        password: 'kawthar@'
      };
      chai.request(server)
        .post('/api/v1/signin')
        .send(registeredUser)
        .end((err, res) => {
          res.should.have.status(409);
          assert.equal('Email is badly formatted', res.body.error.code);
          done();
        });
    });

  it('sign in route should flag error if password is not undefined', (done) => {
    const registeredUser = {
      email: 'kunle@gmail.com'
    };
    chai.request(server)
      .post('/api/v1/signin')
      .send(registeredUser)
      .end((err, res) => {
        res.should.have.status(409);
        assert.equal('Password is required', res.body.error.code);
        done();
      });
  });

  it('sign in route should flag error for a non-registered user', (done) => {
    const registeredUser = {
      email: 'kawthath@gmail.com',
      password: 'kawthar@'
    };
    chai.request(server)
      .post('/api/v1/signin')
      .send(registeredUser)
      .end((err, res) => {
        res.should.have.status(404);
        assert.equal('auth/user-not-found',
          res.body.error.code);
        expect(res.body.error.message).to.equal('There is no user record ' +
          'corresponding to this identifier. The user may have been deleted.');
        done();
      });
  });
  it('sign in route should throw success message valid inputs', (done) => {
    const newUser = {
      email: 'kunle@gmail.com',
      password: 'Ka123@',
    };
    chai.request(server)
      .post('/api/v1/signin')
      .send(newUser)
      .end((err, res) => {
        res.should.have.status(200);
        assert.equal('User Signed in successfully', res.body.message);
        done();
      });
  });
});

// Password Reset Route
describe('PostIt', () => {
  it('password reset route should throw error for not providing email',
    (done) => {
      const userEmail = { email: '' };
      chai.request(server)
        .post('/api/v1/passwordreset')
        .send(userEmail)
        .end((err, res) => {
          res.should.have.status(409);
          assert.equal('User email is required',
            res.body.error.code);
          done();
        });
    });

  it('password reset route should throw error for badly formatted email',
    (done) => {
      const userEmail = { email: 'kunle@.com' };
      chai.request(server)
        .post('/api/v1/passwordreset')
        .send(userEmail)
        .end((err, res) => {
          res.should.have.status(409);
          assert.equal('Email is badly formatted',
            res.body.error.code);
          done();
        });
    });
  it('password reset route should allow registered user`s to ' +
    'reset their passwords', (done) => {
    const userEmail = { email: 'sasil@gmail.com' };
    chai.request(server)
      .post('/api/v1/passwordreset')
      .send(userEmail)
      .end((err, res) => {
        res.should.have.status(201);
        assert.equal('Password reset email sent successfully!',
          res.body.message);
        done();
      });
  });
  it('password reset route should throw an error if email is not found',
    (done) => {
      const userEmail = { email: 'user@gmail.com' };
      chai.request(server)
        .post('/api/v1/passwordreset')
        .send(userEmail)
        .end((err, res) => {
          assert.equal(404, res.statusCode);
          res.should.have.status(404);
          assert.equal('There is no user record corresponding ' +
            'to this identifier. The user may have been deleted.',
            res.body.error.message);
          done();
        });
    });
});

// Sign Out Route
describe('PostIt', () => {
  let token = '';
  before((done) => {
    chai.request(server)
      .post('/api/v1/signin')
      .send({ email: 'kunle@gmail.com', password: 'Ka123@' })
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });
  it('signout route should allow a user sign out successfully', (done) => {
    chai.request(server)
      .post('/api/v1/signout')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.eql('User`s signed-out successfully.');
        done();
      });
  });
});
