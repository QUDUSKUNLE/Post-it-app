process.env.NODE_ENV = 'test';
import assert from 'assert';
import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import server from '../server';
import expiredToken from '../__mock__/expired';

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

  it('Sign up route should throw 400 status code for signing up without email',
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
          res.should.have.status(400);
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
        res.should.have.status(400);
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
          res.should.have.status(400);
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
        res.should.have.status(400);
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
        res.should.have.status(400);
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
        res.should.have.status(400);
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
        res.should.have.status(200);
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
      res.should.have.status(401);
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
        res.should.have.status(401);
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
          res.should.have.status(400);
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
          res.should.have.status(400);
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
        res.should.have.status(400);
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
          res.should.have.status(400);
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
          res.should.have.status(400);
          assert.equal('Email is badly formatted',
            res.body.error.code);
          done();
        });
    });
  // it('password reset route should allow registered user`s to ' +
  //   'reset their passwords', (done) => {
  //   const userEmail = { email: 'sasil@gmail.com' };
  //   chai.request(server)
  //     .post('/api/v1/passwordreset')
  //     .send(userEmail)
  //     .end((err, res) => {
  //       res.should.have.status(200);
  //       assert.equal('Password reset email sent successfully!',
  //         res.body.message);
  //       done();
  //     });
  // });
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

// User's should be able to create grpoup
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

  it('create group route should throw error for undefined group name',
    (done) => {
      const group = { group: '' };
      chai.request(server)
        .post('/api/v1/createGroup')
        .set('x-access-token', token)
        .send(group)
        .end((err, res) => {
          expect(res).to.have.status(400);
          assert.equal(400, res.statusCode);
          assert.equal('Group name is required', res.body.error.code);
          done();
        });
    });

  it('create group route should throw error for group name' +
    ' of character less than three', (done) => {
    const group = { group: 'ab' };
    chai.request(server)
      .post('/api/v1/createGroup')
      .set('x-access-token', token)
      .send(group)
      .end((err, res) => {
        expect(res).to.have.status(400);
        assert.equal('Group name should be at least 3 characters',
          res.body.error.code);
        done();
      });
  });

  // it('create group route should throw error for group name' +
  //   ' of contains characters other than alphabets', (done) => {
  //   const group = { group: 'a23a' };
  //   chai.request(server)
  //     .post('/api/v1/createGroup')
  //     .set('x-access-token', token)
  //     .send(group)
  //     .end((err, res) => {
  //       expect(res).to.have.status(400);
  //       assert.equal('Group name should contain only words',
  //         res.body.error.code);
  //       done();
  //     });
  // });

  it('create group route should allow registered user`s to create groups',
    (done) => {
      const group = { group: faker.name.findName() };
      chai.request(server)
        .post('/api/v1/createGroup')
        .set('x-access-token', token)
        .send(group)
        .end((err, res) => {
          assert.equal(200, res.statusCode);
          assert.equal('Group created successfully', res.body.message);
          done();
        });
    });

  it('create group route should throw an error for an already created group',
    (done) => {
      const group = { group: 'andela' };
      chai.request(server)
        .post('/api/v1/createGroup')
        .set('x-access-token', token)
        .send(group)
        .end((err, res) => {
          expect(res).to.have.status(403);
          assert.equal('Group already exists', res.body.error);
          done();
        });
    });
});

// get members of a group
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

  it('getRegisteredUsers route should allow signed user`s to add group',
    (done) => {
      chai.request(server)
        .get('/api/v1/getRegisteredUsers')
        .set('x-access-token', token)
        .end((err, res) => {
          assert.equal(200, res.statusCode);
          done();
        });
    });
});

// Add member routes
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

  it('addmember route should throw error for undefined memberId',
    (done) => {
      const userId = { memberId: '' };
      chai.request(server)
        .post('/api/v1/addMember/-KyIH2unhlMmgGOlTtk2')
        .set('x-access-token', token)
        .send(userId)
        .end((err, res) => {
          expect(res).to.have.status(400);
          assert.equal('MemberId is required', res.body.error.code);
          done();
        });
    });

  it('addmember route should allow throw error for already existing user',
    (done) => {
      const userId = { memberId: 'KD62nHTPybW047JYnMq6jC2aDJ82' };
      chai.request(server)
        .post('/api/v1/addMember/-Kwj5WsTqFJaFddmh8uD')
        .set('x-access-token', token)
        .send(userId)
        .end((err, res) => {
          assert.equal(403, res.statusCode);
          assert.equal('User`s already a member', res.body.error);
          done();
        });
    });

  // it('addmember route should allow user`s add registered users to groups',
  //   (done) => {
  //     const userId = { memberId: 'ydyF3k3uEOSvFKMbfZfHxXMAWNA2' };
  //     chai.request(server)
  //       .post('/api/v1/addMember/-Kwj5WsTqFJaFddmh8uD')
  //       .set('x-access-token', token)
  //       .send(userId)
  //       .end((err, res) => {
  //         assert.equal(200, res.statusCode);
  //         assert.equal('Add member successfully', res.body.response);
  //         done();
  //       });
  //   });
});
// Send Message Route
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

  it('send Message route should throw error for undefined message', (done) => {
    const messageDetails = { message: '', priority: 'normal' };
    const groupId = '-KwjAZcNyIdpMPk7GS0i';
    chai.request(server)
      .post(`/api/v1/sendMessage/${groupId}`)
      .set('x-access-token', token)
      .send(messageDetails)
      .end((err, res) => {
        res.should.have.status(400);
        assert.equal('Message is required', res.body.error.code);
        done();
      });
  });

  it('send Message route should throw error for undefined message', (done) => {
    const messageDetails = { message: 'Hello wale', priority: '' };
    const groupId = '-KwjAZcNyIdpMPk7GS0i';
    chai.request(server)
      .post(`/api/v1/sendMessage/${groupId}`)
      .set('x-access-token', token)
      .send(messageDetails)
      .end((err, res) => {
        res.should.have.status(400);
        assert.equal('Message priority is required', res.body.error.code);
        done();
      });
  });

  it('send Message route should allow signed in user`s to' +
    ' send message to group with priority normal', (done) => {
    const message = 'Hello everyone';
    const priority = 'normal';
    const groupId = '-KwjAZcNyIdpMPk7GS0i';
    chai.request(server)
      .post(`/api/v1/sendMessage/${groupId}`)
      .set('x-access-token', token)
      .send({ message, priority })
      .end((err, res) => {
        res.should.have.status(200);
        assert.equal(200, res.statusCode);
        assert.equal('Broadcast Message sent successfully', res.body.message);
        done();
      });
  });

  it('send Message route should allow signed in user`s to' +
    ' send message to group with priority urgent', (done) => {
    const message = 'Hello everyone';
    const priority = 'urgent';
    const groupId = '-KwjAZcNyIdpMPk7GS0i';
    chai.request(server)
      .post(`/api/v1/sendMessage/${groupId}`)
      .set('x-access-token', token)
      .send({ message, priority })
      .end((err, res) => {
        expect(res).to.have.status(200);
        assert.equal('Broadcast Message sent successfully', res.body.message);
        assert.equal(message, ((res.body.response)[1]).message);
        assert.equal(priority, ((res.body.response)[1]).priority);
        done();
      });
  });

  // { prority: critical}
  it('send Message route should allow signed in user`s to' +
    ' send message to group with priority critical', (done) => {
    const message = 'Hello everyone';
    const priority = 'critical';
    const groupId = '-KwjAZcNyIdpMPk7GS0i';
    chai.request(server)
      .post(`/api/v1/sendMessage/${groupId}`)
      .set('x-access-token', token)
      .send({ message, priority })
      .end((err, res) => {
        res.should.have.status(200);
        assert.equal(200, res.statusCode);
        assert.equal('Broadcast Message sent successfully', res.body.message);
        assert.equal(message, ((res.body.response)[1]).message);
        assert.equal(priority, ((res.body.response)[1]).priority);
        done();
      });
  });
});

// Get Message Route
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

  it('get Message route should allow signed in user get message' +
    ' from groups', (done) => {
    chai.request(server)
      .get('/api/v1/getMessage/-KwjAZcNyIdpMPk7GS0i')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).to.have.property('response');
        done();
      });
  });
});

// Get group Route
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
  it('getgroups route should allow signed in user`s to get groups a user ' +
    'belongs to', (done) => {
    chai.request(server)
      .get('/api/v1/getGroups')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('getgroups route should not permit ' +
  'expired token to get groups a user belongs to', (done) => {
    chai.request(server)
      .get('/api/v1/getGroups')
      .set('x-access-token', expiredToken.token)
      .end((err, res) => {
        expect(res).to.have.status(401);
        assert.equal('Token has expired', res.body.error);
        done();
      });
  });

  it('getgroups route should not permit ' +
    'request without a token', (done) => {
    chai.request(server)
      .get('/api/v1/getGroups')
      .set('x-access-token', '')
      .end((err, res) => {
        expect(res).to.have.status(403);
        assert.equal('No valid token provided', res.body.error);
        done();
      });
  });

  it('getgroups route should not permit ' +
    'request with an invalid token', (done) => {
    chai.request(server)
      .get('/api/v1/getGroups')
      .set('x-access-token', expiredToken.inValid)
      .end((err, res) => {
        expect(res).to.have.status(401);
        assert.equal('invalid signature', res.body.message);
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
        res.should.have.status(200);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.eql('User`s signed-out successfully.');
        done();
      });
  });
});
