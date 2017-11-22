process.env.NODE_ENV = 'test';
import assert from 'assert';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import expiredToken from '../__mock__/expiredToken';
import mockData from '../__mock__/mockData';

chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

// Test for GroupController
describe('Create group', () => {
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

  it('route should not allow user`s without group name to create group',
    (done) => {
      chai.request(server)
        .post('/api/v1/createGroup')
        .set('x-access-token', token)
        .send(mockData.creatGroupWithOutGroupName)
        .end((err, res) => {
          expect(res).to.have.status(400);
          assert.equal(400, res.statusCode);
          assert.equal('Group name is required', res.body.error.code);
          done();
        });
    });

  it('route should not allow user`s with group name' +
    ' character less than three', (done) => {
    chai.request(server)
      .post('/api/v1/createGroup')
      .set('x-access-token', token)
      .send(mockData.createGroupWithgroupNameLessThanThree)
      .end((err, res) => {
        expect(res).to.have.status(400);
        assert.equal('Group name should be at least 3 characters',
          res.body.error.code);
        done();
      });
  });

  it('route should allow registered user`s to create groups',
    (done) => {
      chai.request(server)
        .post('/api/v1/createGroup')
        .set('x-access-token', token)
        .send(mockData.createGroupWithCorrectDetails)
        .end((err, res) => {
          assert.equal(201, res.statusCode);
          assert.equal('Group created successfully', res.body.message);
          done();
        });
    });

  it('route should throw error for already created group',
    (done) => {
      chai.request(server)
        .post('/api/v1/createGroup')
        .set('x-access-token', token)
        .send(mockData.createGroupWithAlreadyExistGroupName)
        .end((err, res) => {
          expect(res).to.have.status(409);
          assert.equal('Group already exists', res.body.error);
          done();
        });
    });
});

describe('AddMember', () => {
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

  it('route should not allow user`s without memberId to add member to a group',
    (done) => {
      chai.request(server)
        .post('/api/v1/addMember/-Kz5garRTF4ZXikiucJf')
        .set('x-access-token', token)
        .send(mockData.addMemberToGroupWithOutMemberId)
        .end((err, res) => {
          expect(res).to.have.status(400);
          assert.equal('MemberId is required', res.body.error.code);
          done();
        });
    });

  it('route should throw error for already existing user`s in a group',
    (done) => {
      chai.request(server)
        .post('/api/v1/addMember/-Kz5garRTF4ZXikiucJf')
        .set('x-access-token', token)
        .send(mockData.addAlreadyExistingUser)
        .end((err, res) => {
          assert.equal(409, res.statusCode);
          assert.equal('User`s already a member', res.body.error);
          done();
        });
    });
});

describe('Get Group', () => {
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

  it('route should allow signed in user`s to get groups a user ' +
    'belongs to', (done) => {
    chai.request(server)
      .get('/api/v1/getGroups')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('route should allow user`s with ' +
    'expired token to get groups he/she belongs to', (done) => {
    chai.request(server)
      .get('/api/v1/getGroups')
      .set('x-access-token', expiredToken.token)
      .end((err, res) => {
        expect(res).to.have.status(401);
        assert.equal('Token has expired', res.body.error);
        done();
      });
  });

  it('route should not permit any private request without a token', (done) => {
    chai.request(server)
      .get('/api/v1/getGroups')
      .set('x-access-token', '')
      .end((err, res) => {
        expect(res).to.have.status(403);
        assert.equal('No valid token provided', res.body.error);
        done();
      });
  });

  it('route should not permit any private request with an invalid token',
  (done) => {
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

describe('Get Memebr', () => {
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

  it('route should allow signed in user to see members of a group', (done) => {
    const groupId = '-Kz5garRTF4ZXikiucJf';
    chai.request(server)
      .get('/api/v1/getMembers/-Kz5garRTF4ZXikiucJf')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        assert.equal(groupId, (res.body.response)[1]);
        done();
      });
  });
});
