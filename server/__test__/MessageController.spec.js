process.env.NODE_ENV = 'test';
import assert from 'assert';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import messageMockData from '../__mock__/messageMockData';

chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

// Test for Message Controller
describe('Message Controller:', () => {
  // send message route
  describe('Send Message route', () => {
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

    it('should return status 400 if message is an empty string',
    (done) => {
      chai.request(server)
        .post('/api/v1/sendMessage/-KwjAZcNyIdpMPk7GS0i')
        .set('x-access-token', token)
        .send(messageMockData.withOutMessage)
        .end((err, res) => {
          res.should.have.status(400);
          assert.equal('Message is required', res.body.error.code);
          done();
        });
    });

    it(`should return message priority is required if priority is an
     empty string`, (done) => {
      chai.request(server)
        .post('/api/v1/sendMessage/-Kz5fL9UhQOQjoRmHknY')
        .set('x-access-token', token)
        .send(messageMockData.withOutPriority)
        .end((err, res) => {
          res.should.have.status(400);
          assert.equal('Message priority is required', res.body.error.code);
          done();
        });
    });

    it(`should return Broadcast Message sent successfully when user sends
     message with message and priority normal`, (done) => {
      const message = 'Hello everyone';
      const priority = 'normal';
      chai.request(server)
        .post('/api/v1/sendMessage/-Kz5garRTF4ZXikiucJf')
        .set('x-access-token', token)
        .send({ message, priority })
        .end((err, res) => {
          res.should.have.status(201);
          assert.equal(201, res.statusCode);
          assert.equal('Broadcast Message sent successfully', res.body.message);
          done();
        });
    });

    it(`should return Broadcast Message sent successfully when user sends
     message with message and priority urgent`, (done) => {
      const message = 'Hello everyone';
      const priority = 'urgent';
      chai.request(server)
        .post('/api/v1/sendMessage/-Kz5garRTF4ZXikiucJf')
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

    it(`should return Broadcast Message sent successfully when user sends
     message with message and priority critical`, (done) => {
      const message = 'Hello everyone';
      const priority = 'critical';
      chai.request(server)
        .post('/api/v1/sendMessage/-Kz5garRTF4ZXikiucJf')
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

  // Get Message route
  describe('Get message route', () => {
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

    it(`should return status 200 when signed in user get message from a
     group he/she belongs to successfully`, (done) => {
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
});
