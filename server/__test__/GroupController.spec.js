process.env.NODE_ENV = 'test';
import assert from 'assert';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import expiredToken from '../__mock__/expiredToken';
import groupMockData from '../__mock__/groupMockData';
import memberMockData from '../__mock__/memberMockData';

chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

// Test for Group Controller
describe('Group Controller', () => {
  // Test for create group
  describe('create group route', () => {
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

    it(`should return 400 when user sends query with an empty string
     group name`, (done) => {
      chai.request(server)
        .post('/api/v1/createGroup')
        .set('x-access-token', token)
        .send(groupMockData.withOutGroupName)
        .end((err, res) => {
          expect(res).to.have.status(400);
          assert.equal(400, res.statusCode);
          assert.equal('Group name is required', res.body.error.code);
          done();
        });
    });

    it(`should throw error when user's try to create a group with character
     less than 3 character less than three`, (done) => {
      chai.request(server)
        .post('/api/v1/createGroup')
        .set('x-access-token', token)
        .send(groupMockData.groupNameLessThanThree)
        .end((err, res) => {
          expect(res).to.have.status(400);
          assert.equal('Group name should be at least 3 characters',
            res.body.error.code);
          done();
        });
    });

    it('should send success message when a group is created successfully',
      (done) => {
        chai.request(server)
          .post('/api/v1/createGroup')
          .set('x-access-token', token)
          .send(groupMockData.withCorrectDetails)
          .end((err, res) => {
            assert.equal(201, res.statusCode);
            assert.equal('Group created successfully', res.body.message);
            done();
          });
      });

    it(`should throw error for already created group and return
     status code 409`, (done) => {
      chai.request(server)
        .post('/api/v1/createGroup')
        .set('x-access-token', token)
        .send(groupMockData.withAlreadyExistGroupName)
        .end((err, res) => {
          expect(res).to.have.status(409);
          assert.equal('Group already exists', res.body.error);
          done();
        });
    });
  });

  // Add member Route
  describe('AddMember route', () => {
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

    it('should return status 400 if memberId is an empty string',
      (done) => {
        chai.request(server)
          .post('/api/v1/addMember/-Kz5garRTF4ZXikiucJf')
          .set('x-access-token', token)
          .send(memberMockData.withOutMemberId)
          .end((err, res) => {
            expect(res).to.have.status(400);
            assert.equal('MemberId is required', res.body.error.code);
            done();
          });
      });

    it(`should return status code 409 when user sends query with member
     that already exists in a group`,
      (done) => {
        chai.request(server)
          .post('/api/v1/addMember/-Kz5garRTF4ZXikiucJf')
          .set('x-access-token', token)
          .send(memberMockData.alreadyExistingUser)
          .end((err, res) => {
            assert.equal(409, res.statusCode);
            assert.equal('User`s already a member', res.body.error);
            done();
          });
      });
  });

  // Get Group route
  describe('Get Group route', () => {
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

    it(`should return status code 200 when user get the groups
     he belongs to`, (done) => {
      chai.request(server)
        .get('/api/v1/getGroups')
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });

    it(`should return status code 401 when user trys to get getGroups with
     expired token`, (done) => {
      chai.request(server)
        .get('/api/v1/getGroups')
        .set('x-access-token', expiredToken.token)
        .end((err, res) => {
          expect(res).to.have.status(401);
          assert.equal('Token has expired', res.body.error);
          done();
        });
    });

    it('should return status code 403 with a request without a token',
    (done) => {
      chai.request(server)
        .get('/api/v1/getGroups')
        .set('x-access-token', '')
        .end((err, res) => {
          expect(res).to.have.status(403);
          assert.equal('No valid token provided', res.body.error);
          done();
        });
    });

    it('should return invalid signature for request with an invalid token',
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
  // Get Member Route
  describe('Get Memebr route', () => {
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

    it(`should return status code 200 when user access his group members
     successfully`, (done) => {
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
});
