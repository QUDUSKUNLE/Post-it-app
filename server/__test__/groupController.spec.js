process.env.NODE_ENV = 'test';
import assert from 'assert';
import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import server from '../server.js';
import expiredToken from '../__mock__/expired.json';

chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

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
