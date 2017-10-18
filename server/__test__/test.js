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
  it('should throw error for a non validated password', (done) => {
    const newUser = {
      email: faker.internet.email(),
      password: 'kawthar',
      confirmPassword: 'kawthar',
      username: faker.name.findName()
    };
    chai.request(server)
      .post('/api/v1/signup')
      .send(newUser)
      .end((err, res) => {
        res.should.have.status(501);
        assert.equal('password should be at' +
        ' least 6 characters with a speacial character', res.body.error.code);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.have.property('code');
        res.body.should.be.a('object');
        done();
      });
  });

  it('should throw error for password that does not match', (done) => {
    const newUser = {
      email: faker.internet.email(),
      password: 'kawthar@',
      confirmPassword: 'kawthar',
      username: faker.name.findName()
    };
    chai.request(server)
      .post('/api/v1/signup')
      .send(newUser)
      .end((err, res) => {
        res.should.have.status(501);
        assert.equal('Password does not match', res.body.error.code);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.have.property('code');
        res.body.should.be.a('object');
        done();
      });
  });

  it('should allow new users to sign up', (done) => {
    const newUser = {
      email: faker.internet.email(),
      password: 'kawthar@',
      confirmPassword: 'kawthar@',
      username: faker.name.findName()
    };
    chai.request(server)
      .post('/api/v1/signup')
      .send(newUser)
      .end((err, res) => {
        res.should.have.status(200);
        assert.equal('Registration successful and verification ' +
          'email sent to your email', res.body.message);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('response');
        res.body.should.be.a('object');
        assert.equal('object', typeof (res.body.response));
        done();
      });
  });
});

// describe('PostIt', () => {
//   it('should not signed up already registered user', (done) => {
//     const newUser = {
//       email: 'kawthar@gmail.com',
//       password: 'kawthar@',
//       confirmPassword: 'kawthar@',
//       username: 'Joke'
//     };
//     chai.request(server)
//     .post('/api/v1/signup')
//     .send(newUser)
//     .end((err, res) => {
//       assert.equal('The email address is already in use by another account.',
//         res.body.error.message);
//       assert.equal('auth/email-already-in-use', res.body.error.code);
//       res.should.have.status(501);
//       res.body.should.be.a('object');
//       done();
//     });
//   });

//   it('should flag error for bad input email', (done) => {
//     const newUser = {
//       email: 'jksdzfkd',
//       password: 'kawthar@',
//       confirmPassword: 'kawthar@',
//       username: 'Joke'
//     };
//     chai.request(server)
//       .post('/api/v1/signup')
//       .send(newUser)
//       .end((err, res) => {
//         assert.equal('The email address is badly formatted.',
//           res.body.error.message);
//         assert.equal('auth/invalid-email', res.body.error.code);
//         res.should.have.status(400);
//         res.body.should.be.a('object');
//         done();
//       });
//   });

//   it('should flag error if username is undefined', (done) => {
//     const newUser = {
//       email: faker.internet.email(),
//       password: 'kawthar@',
//       confirmPassword: 'kawthar@'
//     };
//     chai.request(server)
//       .post('/api/v1/signup')
//       .send(newUser)
//       .end((err, res) => {
//         assert.equal('Username is required', res.body.error.code);
//         res.should.have.status(501);
//         res.body.should.be.a('object');
//         done();
//       });
//   });

//   it('should flag error if username character is less than 2', (done) => {
//     const newUser = {
//       email: faker.internet.email(),
//       password: 'kawthar@',
//       confirmPassword: 'kawthar@',
//       username: 'k'
//     };
//     chai.request(server)
//       .post('/api/v1/signup')
//       .send(newUser)
//       .end((err, res) => {
//         assert.equal('Username required at least 2 characters',
//           res.body.error.code);
//         res.should.have.status(501);
//         res.body.should.be.a('object');
//         done();
//       });
//   });

//   // Sign In Route
//   it('should allow a registered user sign in successfully', (done) => {
//     const registeredUser = {
//       email: 'kunle@gmail.com',
//       password: 'kawthar@'
//     };
//     chai.request(server)
//       .post('/api/v1/signin')
//       .send(registeredUser)
//       .end((err, res) => {
//         res.should.have.status(200);
//         assert.equal('User Signed in successfully', res.body.message);
//         res.body.should.be.a('object');
//         expect(res.body).to.have.property('message');
//         expect(res.body).to.have.property('response');
//         done();
//       });
//   });

//   it('should flag error if email is undefined', (done) => {
//     const registeredUser = {
//       password: 'kawthar@'
//     };
//     chai.request(server)
//       .post('/api/v1/signin')
//       .send(registeredUser)
//       .end((err, res) => {
//         res.should.have.status(404);
//         assert.equal('Either email or passowrd is not provided', res.body.error.code);
//         res.body.should.be.a('object');
//         expect(res.body).to.have.property('error');
//         expect(res.body.error).to.have.property('code');
//         done();
//       });
//   });

//   it('should flagg error for a wrong password', (done) => {
//     const registeredUser = {
//       email: 'kunle@gmail.com',
//       password: 'kawtha'
//     };
//     chai.request(server)
//       .post('/api/v1/signin')
//       .send(registeredUser)
//       .end((err, res) => {
//         res.should.have.status(401);
//         assert.equal('auth/wrong-password', res.body.error.code);
//         res.body.should.be.a('object');
//         assert.equal('The password is invalid or the user does ' +
//           'not have a password.', res.body.error.message);
//         done();
//       });
//   });

//   it('should flagg error for a non registered user', (done) => {
//     const registeredUser = {
//       email: 'kawthajjjjjj@gmail.com',
//       password: 'kawthar'
//     };
//     chai.request(server)
//       .post('/api/v1/signin')
//       .send(registeredUser)
//       .end((err, res) => {
//         res.should.have.status(404);
//         res.body.should.be.a('object');
//         expect(res.body.error.code).to.equal('auth/user-not-found');
//         expect(res.body.error.message).to.equal('There is no user record ' +
//           'corresponding to this identifier. The user may have been deleted.');
//         done();
//       });
//   });

//   it('should flagg error for an empty email address', (done) => {
//     const registeredUser = {
//       email: '',
//       password: 'kawthar'
//     };
//     chai.request(server)
//       .post('/api/v1/signin')
//       .send(registeredUser)
//       .end((err, res) => {
//         res.should.have.status(400);
//         res.body.should.be.a('object');
//         expect(res.body.error.code).to.equal('auth/invalid-email');
//         expect(res.body.error.message).to.equal('The email address is badly' +
//           ' formatted.');
//         done();
//       });
//   });

//   // Password Reset Route
//   it('should allow registered user`s to reset their passwords', (done) => {
//     const userEmail = { email: 'kunle@gmail.com' };
//     chai.request(server)
//       .post('/api/v1/passwordreset')
//       .send(userEmail)
//       .end((err, res) => {
//         res.should.have.status(200);
//         assert.equal('Password reset email sent successfully!',
//           res.body.message);
//         res.body.should.be.a('object');
//         done();
//       });
//   });

//   it('should flag error for a wrongly formatted password', (done) => {
//     const userEmail = { email: 'user.gmail.com' };
//     chai.request(server)
//       .post('/api/v1/passwordreset')
//       .send(userEmail)
//       .end((err, res) => {
//         assert.equal(400, res.statusCode);
//         assert.equal('The email address is badly formatted.',
//           res.body.error.message);
//         expect(res.body).to.have.property('error');
//         res.body.should.be.a('object');
//         done();
//       });
//   });

//   it('should throw an error if email is not found', (done) => {
//     const userEmail = { email: 'user@gmail.com' };
//     chai.request(server)
//       .post('/api/v1/passwordreset')
//       .send(userEmail)
//       .end((err, res) => {
//         assert.equal(404, res.statusCode);
//         expect(typeof res.body.message).not.be.a('number');
//         assert.equal('There is no user record corresponding ' +
//           'to this identifier. The user may have been deleted.',
//           res.body.error.message);
//         expect(res.body.error).to.have.property('message');
//         res.body.should.be.a('object');
//         done();
//       });
//   });

//   // User's should be able to create grpoup
//   it('should allow registered user`s to create groups', (done) => {
//     const group = { group: faker.name.findName() };
//     chai.request(server)
//       .post('/api/v1/userCreateNewGroup')
//       .send(group)
//       .end((err, res) => {
//         assert.equal(200, res.statusCode);
//         assert.equal('Group created succesfully', res.body.message);
//         expect(res.body).to.have.property('message');
//         expect(res.body).to.have.property('response');
//         done();
//       });
//   });

//   // User's should be able to create grpoup
//   it('should throw an error for an already created password', (done) => {
//     const group = { group: 'andela' };
//     chai.request(server)
//       .post('/api/v1/userCreateNewGroup')
//       .send(group)
//       .end((err, res) => {
//         assert.equal(400, res.statusCode);
//         assert.equal('Group already exists', res.body.error);
//         expect(res.body).to.have.property('error');
//         done();
//       });
//   });

//   it('should allow users to get all groups they belongs to', (done) => {
//     chai.request(server)
//       .post('/api/v1/getUserGroups')
//       .end((err, res) => {
//         assert.equal('object', typeof (res.body.response));
//         assert.equal(200, res.statusCode);
//         expect(res.body).to.have.property('response');
//         done();
//       });
//   });

//   it('should get all register user`s onmounting broadcastcomponent', (done) => {
//     chai.request(server)
//       .post('/api/v1/getAllUsers')
//       .end((err, res) => {
//         assert.equal(200, res.statusCode);
//         assert.equal('object', typeof (res.body.response));
//         done();
//       });
//   });

//   it('should get all member of a particular group', (done) => {
//     const group = { group: 'andela' };
//     chai.request(server)
//       .post('/api/v1/getGroupMember')
//       .send(group)
//       .end((err, res) => {
//         assert.equal(200, res.statusCode);
//         assert.equal('Hey, here are members of the group andela',
//           res.body.message);
//         assert.equal('object', typeof (res.body.response));
//         expect(res.body).to.have.property('message');
//         expect(res.body).to.have.property('response');
//         done();
//       });
//   });


//   it('should allow signed in user`s to send message to general channel',
//     (done) => {
//       const message = { message: 'Hello everyone',
//         priority: 'normal', userName: 'kunle',
//         email: 'kawthar@gmail.com' };
//       chai.request(server)
//         .post('/api/v1/sendGeneralMessage')
//         .send(message)
//         .end((err, res) => {
//           res.should.have.status(200);
//           assert.equal(200, res.statusCode);
//           expect(res.body).to.have.property('response');
//           done();
//         });
//     });

//   it('User`s should be able to get all GeneralMessage', (done) => {
//     chai.request(server)
//       .post('/api/v1/getGeneralMessage')
//       .end((err, res) => {
//         assert.equal(200, res.statusCode);
//         expect(res.body).to.have.property('response');
//         res.body.should.be.a('object');
//         done();
//       });
//   });

//     // Sign Out Route
//   it('should allow a user sign out successfully', (done) => {
//     chai.request(server)
//       .post('/api/v1/signout')
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.be.a('object');
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.eql('User`s signed-out successfully.');
//         done();
//       });
//   });

//   it('User`s should be able to get all GeneralMessage', (done) => {
//     chai.request(server)
//       .post('/api/v1/getGeneralMessage')
//       .end((err, res) => {
//         assert.equal(400, res.statusCode);
//         assert.equal('PERMISSION_DENIED', res.body.error.code);
//         expect(res.body).to.have.property('error');
//         done();
//       });
//   });

//   it('should not allow a user`s that is not sign in to create groups',
//     (done) => {
//       const groupName = { group: 'andela' };
//       chai.request(server)
//         .post('/api/v1/userCreateNewGroup')
//         .send(groupName)
//         .end((err, res) => {
//           assert.equal(401, res.statusCode);
//           expect(res.body).to.have.property('error');
//           assert.equal('User is not signed in', res.body.error);
//           res.body.should.be.a('object');
//           done();
//         });
//     });
// });
