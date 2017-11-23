process.env.NODE_ENV = 'test';
import assert from 'assert';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import mockData from '../__mock__/mockData';

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
  it('route should not allow user with a non validated password to sign up',
    (done) => {
      chai.request(server)
        .post('/api/v1/signup')
        .send(mockData.signUpWithNonValidatedPassword)
        .end((err, res) => {
          res.should.have.status(400);
          assert.equal('Password should be at least 6 characters' +
          ' and contains number', res.body.error.code);
          done();
        });
    });

  it('route should not allow user without an email to sign up',
    (done) => {
      chai.request(server)
        .post('/api/v1/signup')
        .send(mockData.signUpWithoutEmail)
        .end((err, res) => {
          res.should.have.status(400);
          assert.equal('User email is required', res.body.error.code);
          done();
        });
    });

  it('route should not allow users without username to create an account',
  (done) => {
    chai.request(server)
      .post('/api/v1/signup')
      .send(mockData.signUpWithoutUsername)
      .end((err, res) => {
        res.should.have.status(400);
        assert.equal('Username is required', res.body.error.code);
        done();
      });
  });

  it('route should not allow users with username of length less than 2 to ' +
  'sign up',
    (done) => {
      chai.request(server)
        .post('/api/v1/signup')
        .send(mockData.signUpWithUsernameLessThanTwo)
        .end((err, res) => {
          res.should.have.status(400);
          assert.equal('Username should be at least 2 characters',
            res.body.error.code);
          done();
        });
    });

  it('route should not allow user`s whose password and confirmPassword ' +
  'does not match to sign up',
    (done) => {
      chai.request(server)
        .post('/api/v1/signup')
        .send(mockData.signUpWithWrongConfirmPassword)
        .end((err, res) => {
          res.should.have.status(400);
          assert.equal('Password did not match', res.body.error.code);
          done();
        });
    });

  it('route should not allow user with wrong phoneNumber to signup', (done) => {
    chai.request(server)
      .post('/api/v1/signup')
      .send(mockData.signUpWithWrongPhoneNumber)
      .end((err, res) => {
        res.should.have.status(400);
        assert.equal('Incorect phoneNumber', res.body.error.code);
        done();
      });
  });

  it('route should not allow user with invalid phoneNumber to sign up',
  (done) => {
    chai.request(server)
      .post('/api/v1/signup')
      .send(mockData.signUpWithInvalidPhoneNumber)
      .end((err, res) => {
        res.should.have.status(400);
        assert.equal('Enter a valid phone Number', res.body.error.code);
        done();
      });
  });

  it('route should deny user with a badly formatted email to create an account',
  (done) => {
    chai.request(server)
      .post('/api/v1/signup')
      .send(mockData.signUpWithBadFormatEmail)
      .end((err, res) => {
        res.should.have.status(400);
        assert.equal('Email is badly formatted', res.body.error.code);
        done();
      });
  });

  it('route should not allow an already sign up username to sign up',
    (done) => {
      chai.request(server)
        .post('/api/v1/signup')
        .send(mockData.signUpWithAlreadyUsedUserName)
        .end((err, res) => {
          res.should.have.status(409);
          assert.equal('Username already exist!', res.body.error.code);
          done();
        });
    });

  it('route should allow new user`s to sign up', (done) => {
    chai.request(server)
      .post('/api/v1/signup')
      .send(mockData.signUpWithEmailAndPassword)
      .end((err, res) => {
        res.should.have.status(201);
        expect(res.body.response).to.have.property('token');
        assert.equal('User`s sign up successfully', res.body.message);
        done();
      });
  });

  it('route should not sign up already registered user', (done) => {
    chai.request(server)
      .post('/api/v1/signup')
      .send(mockData.signUpWithAlreadySignupUser)
      .end((err, res) => {
        assert.equal('The email address is already in use by another account.',
          res.body.error.message);
        assert.equal('auth/email-already-in-use', res.body.error.code);
        res.should.have.status(422);
        done();
      });
  });
});

// Test for sign In route
describe('SignIn', () => {
  it('route should not allow user with a wrong password to sign in',
    (done) => {
      chai.request(server)
        .post('/api/v1/signin')
        .send(mockData.signInWithWrongPassword)
        .end((err, res) => {
          res.should.have.status(401);
          assert.equal('auth/wrong-password', res.body.error.code);
          assert.equal('The password is invalid or the user does' +
            ' not have a password.', res.body.error.message);
          done();
        });
    });

  it('route should not allow user`s without an email to sign in',
    (done) => {
      chai.request(server)
        .post('/api/v1/signin')
        .send(mockData.signInWithoutEmail)
        .end((err, res) => {
          res.should.have.status(400);
          assert.equal('User email is required', res.body.error.code);
          done();
        });
    });

  it('route should deny user`s with a badly formatted email to sign in',
    (done) => {
      chai.request(server)
        .post('/api/v1/signin')
        .send(mockData.signInWithBadFormatEmail)
        .end((err, res) => {
          res.should.have.status(400);
          assert.equal('Email is badly formatted', res.body.error.code);
          done();
        });
    });

  it('route should not users without password to sign in', (done) => {
    chai.request(server)
      .post('/api/v1/signin')
      .send(mockData.signInWithoutPassword)
      .end((err, res) => {
        res.should.have.status(400);
        assert.equal('Password is required', res.body.error.code);
        done();
      });
  });

  it('route should not allow non-registered user`s to sign in',
  (done) => {
    chai.request(server)
      .post('/api/v1/signin')
      .send(mockData.signInWithWrongDetails)
      .end((err, res) => {
        res.should.have.status(401);
        assert.equal('auth/user-not-found',
          res.body.error.code);
        expect(res.body.error.message).to.equal('There is no user record ' +
          'corresponding to this identifier. The user may have been deleted.');
        done();
      });
  });

  it('route should return success message to a successfully signed in user'
  + ' sign in', (done) => {
    chai.request(server)
      .post('/api/v1/signin')
      .send(mockData.signInWithCorrectDetails)
      .end((err, res) => {
        res.should.have.status(200);
        assert.equal('User Signed in successfully', res.body.message);
        done();
      });
  });
});

// Test for Password Reset Route
describe('PasswordReset', () => {
  it('route should not allow user`s without email to reset password',
    (done) => {
      chai.request(server)
        .post('/api/v1/passwordreset')
        .send(mockData.resetPasswordWithoutEmail)
        .end((err, res) => {
          res.should.have.status(400);
          assert.equal('User email is required',
            res.body.error.code);
          done();
        });
    });

  it('route should not allow user`s with a badly formatted email' +
  ' to reset password',
    (done) => {
      chai.request(server)
        .post('/api/v1/passwordreset')
        .send(mockData.resetPasswordWithBadFormatEmail)
        .end((err, res) => {
          res.should.have.status(400);
          assert.equal('Email is badly formatted',
            res.body.error.code);
          done();
        });
    });

  it('route should allow registered users to ' +
    'reset their passwords', (done) => {
    chai.request(server)
      .post('/api/v1/passwordreset')
      .send(mockData.resetPasswordWithCorrectEmail)
      .end((err, res) => {
        res.should.have.status(200);
        assert.equal('Password reset email sent successfully!',
          res.body.message);
        done();
      });
  });

  it('route should throw an error if email is not found',
    (done) => {
      chai.request(server)
        .post('/api/v1/passwordreset')
        .send(mockData.resetPasswordWithNotFoundEmail)
        .end((err, res) => {
          assert.equal(401, res.statusCode);
          res.should.have.status(401);
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
  it('route should allow user`s sign out successfully', (done) => {
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
