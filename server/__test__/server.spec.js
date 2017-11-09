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
  let token = '';
  before((done) => {
    chai.request(server)
      .post('/api/v1/signin')
      .send({ email: 'quduskunle@gmail.com', password: 'Ka123@' })
      .end((err, res) => {
        token = res.body;
        done();
      });
  });
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
  it('Sign up route should throw error for a non validated password',
    (done) => {
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
          res.should.have.status(403);
          assert.equal('password should be at' +
          ' least 6 characters with a speacial character', res.body.error.code);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.have.property('code');
          res.body.should.be.a('object');
          done();
        });
    });

  // Sign Up Route
  it('sign up route should throw error for a non defined username', (done) => {
    const newUser = {
      email: faker.internet.email(),
      password: 'kawthar@',
      confirmPassword: 'kawthar@'
    };
    chai.request(server)
      .post('/api/v1/signup')
      .send(newUser)
      .end((err, res) => {
        res.should.have.status(400);
        assert.equal('Username is required', res.body.error.code);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.have.property('code');
        res.body.should.be.a('object');
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
        username: 'a'
      };
      chai.request(server)
        .post('/api/v1/signup')
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(403);
          assert.equal('Username required at least 2 characters',
            res.body.error.code);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.have.property('code');
          res.body.should.be.a('object');
          done();
        });
    });

  it('sign up route should throw error for password that does not match',
    (done) => {
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
          res.should.have.status(403);
          assert.equal('Password does not match', res.body.error.code);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.have.property('code');
          res.body.should.be.a('object');
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
        assert.equal('Incorrect phone number', res.body.error.code);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.have.property('code');
        res.body.should.be.a('object');
        done();
      });
  });

  it('sign up route should allow new users to sign up', (done) => {
    const newUser = {
      email: faker.internet.email(),
      password: 'kawthar@',
      confirmPassword: 'kawthar@',
      username: faker.name.findName(),
      phoneNumber: '08092893120'
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

  it('sign up route should throw error for invalid email', (done) => {
    const newUser = {
      email: 'kunle@',
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
        assert.equal('auth/invalid-email', res.body.error.code);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.have.property('code');
        res.body.should.be.a('object');
        assert.equal('object', typeof (res.body.error));
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
      res.should.have.status(403);
      res.body.should.be.a('object');
      done();
    });
  });
});

// Sign In Route
describe('PostIt', () => {
  it('sign in route should allow a registered user sign in successfully',
    (done) => {
      const registeredUser = {
        email: 'kunle@gmail.com',
        password: 'kawthar@'
      };
      chai.request(server)
        .post('/api/v1/signin')
        .send(registeredUser)
        .end((err, res) => {
          res.should.have.status(200);
          assert.equal('User Signed in successfully', res.body.message);
          res.body.should.be.a('object');
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('response');
          done();
        });
    });

  it('sign in route should flag error if email is undefined', (done) => {
    const registeredUser = {
      password: 'kawthar@'
    };
    chai.request(server)
      .post('/api/v1/signin')
      .send(registeredUser)
      .end((err, res) => {
        res.should.have.status(403);
        assert.equal('Either email or passowrd is not provided',
          res.body.error.code);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.have.property('code');
        done();
      });
  });

  it('sign in route should flag error if password is undefined', (done) => {
    const registeredUser = {
      email: 'kawthar@gmail.com'
    };
    chai.request(server)
      .post('/api/v1/signin')
      .send(registeredUser)
      .end((err, res) => {
        res.should.have.status(403);
        assert.equal('Either email or passowrd is not provided',
          res.body.error.code);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.have.property('code');
        done();
      });
  });

  it('sign in route should flag error for invalid email', (done) => {
    const registeredUser = {
      email: 'kawthar@g',
      password: 'kawthar@'
    };
    chai.request(server)
      .post('/api/v1/signin')
      .send(registeredUser)
      .end((err, res) => {
        res.should.have.status(400);
        assert.equal('auth/invalid-email',
          res.body.error.code);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.have.property('code');
        done();
      });
  });

  it('sign in route should flag error for wrong password', (done) => {
    const registeredUser = {
      email: 'kawthar@gmail.com',
      password: 'kawth'
    };
    chai.request(server)
      .post('/api/v1/signin')
      .send(registeredUser)
      .end((err, res) => {
        res.should.have.status(401);
        assert.equal('auth/wrong-password',
          res.body.error.code);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.have.property('code');
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
        res.body.should.be.a('object');
        expect(res.body).to.have.property('error');
        expect(res.body.error.message).to.equal('There is no user record ' +
          'corresponding to this identifier. The user may have been deleted.');
        expect(res.body.error).to.have.property('code');
        done();
      });
  });
});

 // Password Reset Route
describe('PostIt', () => {
  it('password reset route should allow registered user`s to ' +
    'reset their passwords', (done) => {
    const userEmail = { email: 'sasil@gmail.com' };
    chai.request(server)
      .post('/api/v1/passwordreset')
      .send(userEmail)
      .end((err, res) => {
        res.should.have.status(200);
        assert.equal('Password reset email sent successfully!',
          res.body.message);
        res.body.should.be.a('object');
        done();
      });
  });

  it('password reset route should flag error for a wrongly' +
    'formatted password', (done) => {
    const userEmail = { email: 'user.gmail.com' };
    chai.request(server)
      .post('/api/v1/passwordreset')
      .send(userEmail)
      .end((err, res) => {
        assert.equal(400, res.statusCode);
        assert.equal('The email address is badly formatted.',
          res.body.error.message);
        expect(res.body).to.have.property('error');
        res.body.should.be.a('object');
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
          expect(typeof res.body.message).not.be.a('number');
          assert.equal('There is no user record corresponding ' +
            'to this identifier. The user may have been deleted.',
            res.body.error.message);
          expect(res.body.error).to.have.property('message');
          res.body.should.be.a('object');
          done();
        });
    });
});

// User's should be able to create grpoup
describe('PostIt', () => {
  it('sign in route should allow a registered user sign in successfully',
    (done) => {
      const registeredUser = {
        email: 'sasil@gmail.com',
        password: 'kawthar@'
      };
      chai.request(server)
        .post('/api/v1/signin')
        .send(registeredUser)
        .end((err, res) => {
          res.should.have.status(200);
          assert.equal('User Signed in successfully', res.body.message);
          res.body.should.be.a('object');
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('response');
          done();
        });
    });

  it('create group route should allow registered user`s to create groups',
    (done) => {
      const group = { group: faker.name.findName() };
      chai.request(server)
        .post('/api/v1/createGroup')
        .send(group)
        .end((err, res) => {
          assert.equal(200, res.statusCode);
          assert.equal('Group created successfully', res.body.message);
          expect(res.body).to.have.property('message');
          done();
        });
    });

  it('create group route throw an error for an already created password',
    (done) => {
      const group = { group: 'andela' };
      chai.request(server)
        .post('/api/v1/createGroup')
        .send(group)
        .end((err, res) => {
          assert.equal(403, res.statusCode);
          assert.equal('Group already exists', res.body.error);
          expect(res.body).to.have.property('error');
          done();
        });
    });
});

 // get members of a group
describe('PostIt', () => {
  it('add member route should allow signed user`s to get members of a group',
    (done) => {
      const groupId = '-Kwj5WsTqFJaFddmh8uD';
      chai.request(server)
        .get(`/api/v1/getMembers/${groupId}`)
        .end((err, res) => {
          assert.equal(200, res.statusCode);
          assert.equal('object', typeof (res.body.response));
          done();
        });
    });
});

describe('PostIt', () => {
  it('getUsers route should be able to get all register user`s', (done) => {
    chai.request(server)
      .get('/api/v1/getAllRegisteredUsers')
      .end((err, res) => {
        assert.equal(200, res.statusCode);
        assert.equal('object', typeof (res.body.response));
        done();
      });
  });
});

describe('PostIt', () => {
  it('getgroups route should allow user`s get all groups he belongs to',
    (done) => {
      const userId = 'KD62nHTPybW047JYnMq6jC2aDJ82';
      chai.request(server)
        .get(`/api/v1/getgroups/${userId}`)
        .end((err, res) => {
          assert.equal(200, res.statusCode);
          assert.equal('object', typeof (res.body.response));
          done();
        });
    });
});

describe('PostIt', () => {
  it('addmember route should allow user`s add registered users to groups',
    (done) => {
      const memberDetails = {
        memberId: 'YExyPJnTgLSRU8YkJ2pgGEzEiS93',
        group: 'adolfo fisher',
      };
      const groupId = '-KwjAZcNyIdpMPk7GS0i';
      chai.request(server)
        .post(`/api/v1/addmember/${groupId}`)
        .send(memberDetails)
        .end((err, res) => {
          assert.equal(200, res.statusCode);
          expect(res.body).to.have.property('response');
          assert.equal('Add member successfully', res.body.response);
          assert.equal('object', typeof (res.body));
          done();
        });
    });

  // { prority: normal}
  it('send Message route should allow signed in user`s to' +
    'send message to group', (done) => {
    const message = 'Hello everyone';
    const priority = 'normal';
    const groupId = '-KwjAZcNyIdpMPk7GS0i';
    chai.request(server)
      .post(`/api/v1/sendMessage/${groupId}`)
      .send({ message, priority })
      .end((err, res) => {
        res.should.have.status(200);
        assert.equal(200, res.statusCode);
        assert.equal('Broadcast Message sent successfully', res.body.message);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('response');
        done();
      });
  });

  // { prority: urgent}
  it('send Message route should allow signed in user`s to' +
    'send message to group', (done) => {
    const message = 'Hello everyone';
    const priority = 'urgent';
    const groupId = '-KwjAZcNyIdpMPk7GS0i';
    chai.request(server)
      .post(`/api/v1/sendMessage/${groupId}`)
      .send({ message, priority })
      .end((err, res) => {
        res.should.have.status(200);
        assert.equal(200, res.statusCode);
        assert.equal('Broadcast Message sent successfully', res.body.message);
        expect(res.body).to.have.property('response');
        expect(res.body).to.have.property('message');
        done();
      });
  });

  // { prority: critical}
  it('send Message route should allow signed in user`s to' +
    'send message to group', (done) => {
    const message = 'Hello everyone';
    const priority = 'critical';
    const groupId = '-KwjAZcNyIdpMPk7GS0i';
    chai.request(server)
      .post(`/api/v1/sendMessage/${groupId}`)
      .send({ message, priority })
      .end((err, res) => {
        res.should.have.status(200);
        assert.equal(200, res.statusCode);
        assert.equal('Broadcast Message sent successfully', res.body.message);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('response');
        done();
      });
  });

  // Registered user should be able to send message to a group
  // { prority: normal}
  it('send Message route should not send a message if message' +
    'length is less than 1', (done) => {
    const message = '';
    const priority = 'critical';
    const groupId = '-KwjAZcNyIdpMPk7GS0i';
    chai.request(server)
      .post(`/api/v1/sendMessage/${groupId}`)
      .send({ message, priority })
      .end((err, res) => {
        res.should.have.status(403);
        assert.equal(403, res.statusCode);
        assert.equal('No message sent', res.body.error);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});

// Sign Out Route
describe('PostIt', () => {
  it('signout route should allow a user sign out successfully', (done) => {
    chai.request(server)
      .post('/api/v1/signout')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.eql('User`s signed-out successfully.');
        done();
      });
  });

  it('signout route should not allow a user`s that is not sign' +
    'in to create groups', (done) => {
    const groupName = { group: 'andela' };
    chai.request(server)
      .post('/api/v1/createGroup')
      .send(groupName)
      .end((err, res) => {
        assert.equal(401, res.statusCode);
        expect(res.body).to.have.property('error');
        assert.equal('User is not signed in', res.body.error);
        res.body.should.be.a('object');
        done();
      });
  });

  it('getAllRegisteredUsers should throw error while' +
    'trying to access it', (done) => {
    chai.request(server)
      .get('/api/v1/getAllRegisteredUsers')
      .end((err, res) => {
        assert.equal(401, res.statusCode);
        expect(res.body).to.have.property('error');
        assert.equal('User is not signed in', res.body.error);
        assert.equal('object', typeof (res.body));
        done();
      });
  });

  it('getMmebers route should throw error for a not signed user' +
    'while getting group members', (done) => {
    const groupId = '-Kwj5WsTqFJaFddmh8uD';
    chai.request(server)
      .get(`/api/v1/getMembers/${groupId}`)
      .end((err, res) => {
        assert.equal(401, res.statusCode);
        expect(res.body).to.have.property('error');
        assert.equal('User is not signed in', res.body.error);
        assert.equal('object', typeof (res.body));
        done();
      });
  });

  it('getgroups route should not allow not signed in user`s get groups a user' +
   'belongs to', (done) => {
    const userId = 'KD62nHTPybW047JYnMq6jC2aDJ82';
    chai.request(server)
      .get(`/api/v1/getgroups/${userId}`)
      .end((err, res) => {
        assert.equal(401, res.statusCode);
        expect(res.body).to.have.property('error');
        assert.equal('User is not signed in', res.body.error);
        assert.equal('string', typeof (res.body.error));
        done();
      });
  });

  it('addmember route should throw error for a not signed in user`s' +
    'to add member', (done) => {
    const memberDetails = {
      memberId: 'YExyPJnTgLSRU8YkJ2pgGEzEiS93',
      group: 'adolfo fisher',
    };
    const groupId = '-KwjAZcNyIdpMPk7GS0i';
    chai.request(server)
      .post(`/api/v1/addmember/${groupId}`)
      .send(memberDetails)
      .end((err, res) => {
        assert.equal(400, res.statusCode);
        expect(res.body).to.have.property('error');
        assert.equal('User not signed in', res.body.error);
        assert.equal('string', typeof (res.body.error));
        done();
      });
  });

  it('sendMessage route not should allow not signed in user`s to' +
    'send message to group', (done) => {
    const message = 'Hello everyone';
    const priority = 'normal';
    const groupId = '-KwjAZcNyIdpMPk7GS0i';
    chai.request(server)
      .post(`/api/v1/sendMessage/${groupId}`)
      .send({ message, priority })
      .end((err, res) => {
        res.should.have.status(401);
        assert.equal(401, res.statusCode);
        expect(res.body).to.have.property('error');
        assert.equal('PERMISSION_DENIED', res.body.error.code);
        assert.equal('User is not signed in', res.body.error.message);
        done();
      });
  });
});

