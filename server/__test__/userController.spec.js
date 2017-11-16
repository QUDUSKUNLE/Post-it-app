process.env.NODE_ENV = 'test';
import assert from 'assert';
import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import server from '../server';

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
});

// Test for sign up route
describe('Sign up', () => {
  it('route should throw status code 400 for a non valid password',
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
          res.should.have.status(400);
          assert.equal('Password must be at least 6 characters and' +
          ' contain number', res.body.error.code);
          done();
        });
    });

  it('route should throw status code 400 for signing up without email',
    (done) => {
      const newUser = {
        email: '',
        password: 'kawthar',
        confirmPassword: 'kawthar',
        username: faker.name.findName(),
        phoneNumber: '08052327990'
      };
      chai.request(server)
        .post('/api/v1/signup')
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(400);
          assert.equal('User email is required', res.body.error.code);
          done();
        });
    });

  it('route should throw status code 400 for a non defined username',
  (done) => {
    const newUser = {
      email: faker.internet.email(),
      password: 'kawthar2',
      confirmPassword: 'kawthar',
      username: '',
      phoneNumber: '08052327990'
    };
    chai.request(server)
      .post('/api/v1/signup')
      .send(newUser)
      .end((err, res) => {
        res.should.have.status(400);
        assert.equal('Username is required', res.body.error.code);
        done();
      });
  });

  it('route should throw status code 400 for a username of length less than 2',
    (done) => {
      const newUser = {
        email: faker.internet.email(),
        password: 'kawthar1',
        confirmPassword: 'kawthar1',
        username: 'a',
        phoneNumber: '08052327990'
      };
      chai.request(server)
        .post('/api/v1/signup')
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(400);
          assert.equal('Username should be at least 2 characters',
            res.body.error.code);
          done();
        });
    });

  it('route should throw status code 403 for password that does not match',
    (done) => {
      const newUser = {
        email: faker.internet.email(),
        password: 'kawthar1',
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

  it('route should throw status code for wrong phoneNumber', (done) => {
    const newUser = {
      email: faker.internet.email(),
      password: 'kawthar1',
      confirmPassword: 'kawthar1',
      username: faker.name.findName(),
      phoneNumber: '0809289312'
    };
    chai.request(server)
      .post('/api/v1/signup')
      .send(newUser)
      .end((err, res) => {
        res.should.have.status(400);
        assert.equal('Incorect phoneNumber', res.body.error.code);
        done();
      });
  });
  it('route should throw error for invalid phoneNumber', (done) => {
    const newUser = {
      email: faker.internet.email(),
      password: 'kawthar1',
      confirmPassword: 'kawthar1',
      username: faker.name.findName(),
      phoneNumber: '0809289312123'
    };
    chai.request(server)
      .post('/api/v1/signup')
      .send(newUser)
      .end((err, res) => {
        res.should.have.status(400);
        assert.equal('Enter a valid phone Number', res.body.error.code);
        done();
      });
  });
  it('route should throw error for a badly formatted email', (done) => {
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
        res.should.have.status(400);
        assert.equal('Email is badly formatted', res.body.error.code);
        done();
      });
  });

  it('route should allow new users to sign up', (done) => {
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
        expect(res.body.response).to.have.property('token');
        assert.equal('User`s sign up successfully', res.body.message);
        done();
      });
  });

  it('route should not sign up already registered user', (done) => {
    const newUser = {
      email: 'kawthar@gmail.com',
      password: 'kawthar1',
      confirmPassword: 'kawthar1',
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

// Test for sign In route
describe('SignIn', () => {
  it('route should throw status code 409 for providing wrong password',
    (done) => {
      const registeredUser = {
        email: 'Kemi@gmail.com',
        password: 'Ka123@#'
      };
      chai.request(server)
        .post('/api/v1/signin')
        .send(registeredUser)
        .end((err, res) => {
          res.should.have.status(409);
          assert.equal('auth/wrong-password', res.body.error.code);
          assert.equal('The password is invalid or the user does' +
            ' not have a password.', res.body.error.message);
          done();
        });
    });

  it('route should return status code 400 for undefined email',
    (done) => {
      const registeredUser = {
        email: '',
        password: 'kawthar@'
      };
      chai.request(server)
        .post('/api/v1/signin')
        .send(registeredUser)
        .end((err, res) => {
          res.should.have.status(400);
          assert.equal('User email is required', res.body.error.code);
          done();
        });
    });

  it('route should return status code 400 for a badly formatted email',
    (done) => {
      const registeredUser = {
        email: 'kunle.com',
        password: 'kawthar@'
      };
      chai.request(server)
        .post('/api/v1/signin')
        .send(registeredUser)
        .end((err, res) => {
          res.should.have.status(400);
          assert.equal('Email is badly formatted', res.body.error.code);
          done();
        });
    });

  it('route should return status code 400 for undefined password', (done) => {
    const registeredUser = {
      email: 'kunle@gmail.com',
      password: ''
    };
    chai.request(server)
      .post('/api/v1/signin')
      .send(registeredUser)
      .end((err, res) => {
        res.should.have.status(400);
        assert.equal('Password is required', res.body.error.code);
        done();
      });
  });

  it('route should return status code 404 for a non-registered user',
  (done) => {
    const registeredUser = {
      email: 'kawthath@gmail.com',
      password: 'kawthar1'
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

  it('route should return success message and status code 200 for successfull'
  + ' sign in', (done) => {
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

// Test for Password Reset Route
describe('PasswordReset', () => {
  it('route should return status code 400 for not providing email',
    (done) => {
      const userEmail = { email: '' };
      chai.request(server)
        .post('/api/v1/passwordreset')
        .send(userEmail)
        .end((err, res) => {
          res.should.have.status(400);
          assert.equal('User email is required',
            res.body.error.code);
          done();
        });
    });

  it('route should return status code 400 for badly formatted email',
    (done) => {
      const userEmail = { email: 'kunle@.com' };
      chai.request(server)
        .post('/api/v1/passwordreset')
        .send(userEmail)
        .end((err, res) => {
          res.should.have.status(400);
          assert.equal('Email is badly formatted',
            res.body.error.code);
          done();
        });
    });
  it('route should allow registered user`s to ' +
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
  it('route should throw an error if email is not found',
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

// Test for Sign Out Route
describe('SignOut', () => {
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
  it('route should allow a user sign out successfully', (done) => {
    chai.request(server)
      .post('/api/v1/signout')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.eql('User`s signed-out successfully.');
        done();
      });
  });
});


// Test for Search endpoint
describe('Search', () => {
  let token = '';
  before((done) => {
    chai.request(server)
      .post('/api/v1/signin')
      .send({ email: 'asake@gmail.com', password: 'Ka123@' })
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });
  it('route should allow a user to search for user and' +
  ' add to a group', (done) => {
    chai.request(server)
      .post('/api/v1/search')
      .set('x-access-token', token)
      .send({ keyword: 'O' })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});
