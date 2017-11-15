process.env.NODE_ENV = 'test';
import assert from 'assert';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server.js';

chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

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
        res.should.have.status(409);
        assert.equal('Message is required', res.body.error.code);
        done();
      });
  });

  it('send Message route should throw error for undefined priority', (done) => {
    const messageDetails = { message: 'Hello wale', priority: '' };
    const groupId = '-KwjAZcNyIdpMPk7GS0i';
    chai.request(server)
      .post(`/api/v1/sendMessage/${groupId}`)
      .set('x-access-token', token)
      .send(messageDetails)
      .end((err, res) => {
        res.should.have.status(409);
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
        res.should.have.status(201);
        assert.equal(201, res.statusCode);
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
        expect(res).to.have.status(201);
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
        res.should.have.status(201);
        assert.equal(201, res.statusCode);
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
