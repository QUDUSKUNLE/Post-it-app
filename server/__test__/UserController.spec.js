process.env.NODE_ENV = 'test';
import assert from 'assert';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import signUpMockData from '../__mock__/signUpMockData';
import signInMockData from '../__mock__/signInMockData';

chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

// Test for sign up route
describe('User Controller:', () => {
  describe('Sign up route', () => {
    it(`should throw error when user provides query with password that
    does not meet specification`,
      (done) => {
        chai.request(server)
          .post('/api/v1/signup')
          .send(signUpMockData.inCorrectPassword)
          .end((err, res) => {
            res.should.have.status(400);
            const assertText = [
              'Password should be at least 6 characters',
              'and contains number'
            ]
            assert.equal(assertText.join(' '), res.body.error.code);
            done();
          });
      });

    it('should flag error when user provides query without email', (done) => {
      chai.request(server)
        .post('/api/v1/signup')
        .send(signUpMockData.withoutEmail)
        .end((err, res) => {
          res.should.have.status(400);
          assert.equal('User email is required', res.body.error.code);
          done();
        });
    });

    it(`should throw username is required when user provides
    query without username`,
    (done) => {
      chai.request(server)
        .post('/api/v1/signup')
        .send(signUpMockData.withoutUsername)
        .end((err, res) => {
          res.should.have.status(400);
          assert.equal('Username is required', res.body.error.code);
          done();
        });
    });

    it(`should throw error when user provides query with username which
     character length is length than two`,
      (done) => {
        chai.request(server)
          .post('/api/v1/signup')
          .send(signUpMockData.withUsernameLessThanTwo)
          .end((err, res) => {
            res.should.have.status(400);
            assert.equal('Username should be at least 2 characters',
              res.body.error.code);
            done();
          });
      });

    it(`should throw password does not match when user provides query with
    password and confirmPassword that did not match`,
      (done) => {
        chai.request(server)
          .post('/api/v1/signup')
          .send(signUpMockData.withWrongConfirmPassword)
          .end((err, res) => {
            res.should.have.status(400);
            assert.equal('Password did not match', res.body.error.code);
            done();
          });
      });

    it(`should flag incorrect phone number when user provides query
    with incorrect phone number (i.e not equal to eleven character)`,
    (done) => {
      chai.request(server)
        .post('/api/v1/signup')
        .send(signUpMockData.inCorrectPhoneNumber)
        .end((err, res) => {
          res.should.have.status(400);
          assert.equal('Incorect phoneNumber', res.body.error.code);
          done();
        });
    });

    it('should throw error when user sends query with an invalid phoneNumber',
    (done) => {
      chai.request(server)
        .post('/api/v1/signup')
        .send(signUpMockData.invalidPhoneNumber)
        .end((err, res) => {
          res.should.have.status(400);
          assert.equal('Enter a valid phone Number', res.body.error.code);
          done();
        });
    });

    it(`should throw email is badly formatted when user sends query 
    with a badly formatted email address`, (done) => {
      chai.request(server)
        .post('/api/v1/signup')
        .send(signUpMockData.badFormatEmail)
        .end((err, res) => {
          res.should.have.status(400);
          assert.equal('Email is badly formatted', res.body.error.code);
          done();
        });
    });

    it(`should throw error when user sends query with username that is already
    in use`, (done) => {
      chai.request(server)
        .post('/api/v1/signup')
        .send(signUpMockData.alreadyUsedUserName)
        .end((err, res) => {
          res.should.have.status(409);
          assert.equal('Username already exist!', res.body.error.code);
          done();
        });
    });

    it(`should send success message when user sends query that meet all
    specifications for signing up`, (done) => {
      chai.request(server)
        .post('/api/v1/signup')
        .send(signUpMockData.emailAndPassword)
        .end((err, res) => {
          res.should.have.status(201);
          expect(res.body.response).to.have.property('token');
          assert.equal('User`s sign up successfully', res.body.message);
          done();
        });
    });

    it(`should throw error when user trys to sign up with an email that's
    already in use by another user`, (done) => {
      chai.request(server)
        .post('/api/v1/signup')
        .send(signUpMockData.alreadySignupUser)
        .end((err, res) => {
          assert.equal('The email address is already in use by another account.'
          , res.body.error.message);
          assert.equal('auth/email-already-in-use', res.body.error.code);
          res.should.have.status(422);
          done();
        });
    });
  });

  // Test for sign In route
  describe('Sign in route', () => {
    it('should throw error when user sends query with a wrong password',
    (done) => {
      chai.request(server)
        .post('/api/v1/signin')
        .send(signInMockData.wrongPassword)
        .end((err, res) => {
          res.should.have.status(401);
          assert.equal('auth/wrong-password', res.body.error.code);
          const assertText = [
            'The password is invalid or the user does',
            'not have a password.'
          ]
          assert.equal(assertText.join(' '), res.body.error.message);
          done();
        });
    });

    it(`should flag error message when user sends query 
    without an email address`, (done) => {
      chai.request(server)
        .post('/api/v1/signin')
        .send(signInMockData.withoutEmail)
        .end((err, res) => {
          res.should.have.status(400);
          assert.equal('User email is required', res.body.error.code);
          done();
        });
    });

    it(`should return 400 when user's send query with a badly formatted email
     address`, (done) => {
      chai.request(server)
        .post('/api/v1/signin')
        .send(signInMockData.badEmail)
        .end((err, res) => {
          res.should.have.status(400);
          assert.equal('Email is badly formatted', res.body.error.code);
          done();
        });
    });

    it('should return status 400 if password is an empty string', (done) => {
      chai.request(server)
        .post('/api/v1/signin')
        .send(signInMockData.withoutPassword)
        .end((err, res) => {
          res.should.have.status(400);
          assert.equal('Password is required', res.body.error.code);
          done();
        });
    });

    it('should return status 401 if user details cannot be found',
    (done) => {
      chai.request(server)
        .post('/api/v1/signin')
        .send(signInMockData.withWrongDetails)
        .end((err, res) => {
          res.should.have.status(401);
          assert.equal('auth/user-not-found',
            res.body.error.code);
          const assertText = [
            'There is no user record corresponding to',
            'this identifier. The user may have been deleted.'
          ]
          expect(res.body.error.message).to.equal(assertText.join(' '));
          done();
        });
    });

    it('should return success message to a successfully signed in user sign in',
    (done) => {
      chai.request(server)
        .post('/api/v1/signin')
        .send(signInMockData.withCorrectDetails)
        .end((err, res) => {
          res.should.have.status(200);
          assert.equal('User Signed in successfully', res.body.message);
          done();
        });
    });
  });

  // Test for Password Reset Route
  describe('Passwordreset route', () => {
    it('should return status 400 if email is an empty string',
      (done) => {
        chai.request(server)
          .post('/api/v1/passwordreset')
          .send(signInMockData.resetPasswordWithoutEmail)
          .end((err, res) => {
            res.should.have.status(400);
            assert.equal('User email is required',
              res.body.error.code);
            done();
          });
      });

    it(`should return error message when user's provides query with a badly
     formatted email to reset password`,
      (done) => {
        chai.request(server)
          .post('/api/v1/passwordreset')
          .send(signInMockData.resetPasswordWithBadEmail)
          .end((err, res) => {
            res.should.have.status(400);
            assert.equal('Email is badly formatted',
              res.body.error.code);
            done();
          });
      });

    it(`should return success message and status 200 when user makes query
     with a registered email address`, (done) => {
      chai.request(server)
        .post('/api/v1/passwordreset')
        .send(signInMockData.resetPasswordWithCorrectEmail)
        .end((err, res) => {
          res.should.have.status(200);
          assert.equal('Password reset email sent successfully!',
            res.body.message);
          done();
        });
    });

    it('should throw error message when email provided can not be found',
      (done) => {
        chai.request(server)
          .post('/api/v1/passwordreset')
          .send(signInMockData.notExistingEmail)
          .end((err, res) => {
            assert.equal(401, res.statusCode);
            res.should.have.status(401);
            const assertText = [
              'There is no user record corresponding',
              'to this identifier. The user may have been deleted.'
            ];
            assert.equal(assertText.join(' '), res.body.error.message);
            done();
          });
      });
  });

  // Test for Sign Out Route
  describe('SignOut route', () => {
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
    it('should send success message for signing out successfully', (done) => {
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
  describe('Search route', () => {
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
    it('should allow user to search for other users', (done) => {
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
});
