process.env.NODE_ENV = 'test';
const app = require('../server/server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const request = require('supertest');
const expect = chai.expect;

// PostIt-app APIs Unit tests
describe('PostIt-app:', () => {
    //	Unit test for the App Homepage route
    describe('', () => {
        it('welcome user`s to its page', (done) => {
            request(app)
                .get('/')
                .set('Accept', 'application/json')
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200);
                    if (err) return done(err);
                    done();
                });
        });
    });

    // Unit test for User`s sign up route
    describe('Sign Up route', () => {
        it('should throw `statusCode 200` for every user`s who has registered', (done) => {
            request(app)
                .post('/user/signup')
                .send({
                    'username': 'Qudus Kunle',
                    'email': 'quduskunle@gmail.com',
                    'password': 'kawtharadejoke08971'
                })
                .set('Accept', 'application/json')
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body.message).to.equal('Registration successful and verification email sent to your email');
                    expect(typeof res.body.message).to.equal('string');
                    expect(typeof res.body).to.equal('object');
                    if (err) return done(err);
                    done();
                });
        });
    });

    // Unit test for Use`s sign in route
    describe('sign in route', () => {
        it('should sign in a user`s who had signed up and return `User Signed in successfully`', (done) => {
            request(app)
                .post('/user/signin')
                .send({
                    'email': 'quduskunle@gmail.com',
                    'password': 'kawtharadejoke08971'
                })
                .set('Accept', 'application/json')
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body.message).to.equal('User Signed in successfully');
                    expect(typeof res.body.message).not.be.a('number');
                    if (err) return done(err);
                    done();
                });
        });

        it('should throw `Not Found` and statusCode `404` if a user`s log in details is not found', (done) => {
            request(app)
                .post('/user/signin')
                .send({
                    'email': 'kunkebon@gmail.com',
                    'password': 'kunke08971'
                })
                .set('Accept', 'application/json')
                .end((err, res) => {
                    expect(res.statusCode).to.equal(404);
                    expect(res.body.message).to.equal('Not Found');
                    if (err) return done(err);
                    done();
                })
        })
    });

    // Unit test for User`s sign-out route
    describe('sign out', () => {
        it('every user`s that signed out with `statusCode 200`', (done) => {
            request(app)
                .post('/user/signout')
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body.message).to.equal('User`s signed-out successfully.');
                    if (err) return done(err);
                    done();
                });
        });
    });

    //	Unit test for a registered User`s to create a group 
    describe('allows', () => {
        it('registered user`s to create groups and return `Group Created Successfully`', (done) => {
            request(app)
                .post('/group')
                .send({
                    'email': 'quduskunle@gmail.com',
                    'password': 'kawtharadejoke08971',
                    'group': 'ilaa' // Change group name
                })
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body.message).to.equal('Group Created Successfully');
                    if (err) return done(err);
                    done();
                });
        });

    });

    //	Unit test for a non registered user`s
    describe('should not allow', () => {
        it('non registered user`s to create groups and return `User`s not registered`', (done) => {
            request(app)
                .post('/group')
                .send({
                    'email': 'kunle@gmail.com',
                    'password': 'kawtharadejoke08971',
                    'group': 'okoko'
                })
                .end((err, res) => {
                    expect(res.statusCode).to.equal(401);
                    expect(res.body.message).to.equal('User`s not registered');
                    if (err) return done(err);
                    done();
                });
        });
    });

    // Unit test for User`s to add member to his/her group
    describe('should allow registered user`s', () => {
        it('to add registered friends to his/her group and should return `statusCode 200` and `Member added successfully`', (done) => {
            request(app)
                .post('/group/groupId/user')
                .send({
                    'email': 'quduskunle@gmail.com',
                    'password': 'kawtharadejoke08971',
                    'group': 'okoko',
                    'user': 'aALLKIiiiw0908erQERRCRTY'
                })
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body.message).to.equal('Member added successfully');
                    if (err) return done(err);
                    done();
                });
        });
    });

    // Unit test for User`s to delete his/her account from PostIt-app
    describe('should tell', () => {
        it('non registered user`s `User`s not Found` and return `statusCode 404`', (done) => {
            request(app)
                .post('/user/delete')
                .send({
                    'email': 'quduskle@gmail.com',
                    'password': 'kawtharadejoke08971',
                })
                .end((err, res) => {
                    expect(res.statusCode).to.equal(404);
                    expect(res.body.message).to.equal('User`s not Found');
                    if (err) return done(err);
                    done();
                });
        });

    });

    // Unit test for User`s to delete his/her account from PostIt-app
    describe('should allow', () => {
        it('registered user`s to delete his/her account and should return `statusCode 200` and `User`s deleted successfully`', (done) => {
            request(app)
                .post('/user/delete')
                .send({
                    'email': 'quduskunle@gmail.com',
                    'password': 'kawtharadejoke08971',
                })
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body.message).to.equal('User`s deleted successfully ');
                    if (err) return done(err);
                    done();
                });
        });

    });
});