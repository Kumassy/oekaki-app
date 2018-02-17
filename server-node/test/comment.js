const request = require('supertest');
const app = require('../app');
const chai = require('chai');
const expect = chai.expect;
// const assert = require('assert');
const fixtures = require('sequelize-fixtures');
const passportStub = require('passport-stub');
const models  = require('../models');

describe('express: /comments', function() {
  describe('GET /comments', function() {
    this.timeout(10000);

    before(function() {
      return models.sequelize.sync({force: true })
        .then(() => {
          return fixtures.loadFile('fixtures/users.yaml', models)
        })
        .then(() => {
          return fixtures.loadFile('fixtures/threads.yaml', models)
        })
    });

    it('should respond with one comment for /comments', function() {
      return request(app)
        .get('/comments')
        .expect(200)
        .then(res => {
          expect(res.body).to.have.all.keys('comments');
          expect(res.body.comments).to.have.lengthOf(1);
        })
    });
  });

  describe('POST /comments', function() {
    this.timeout(10000);

    before(() => {
      return models.sequelize.sync({force: true })
        .then(() => {
          return fixtures.loadFile('fixtures/users.yaml', models)
        })
        .then(() => {
          return fixtures.loadFile('fixtures/threads.yaml', models)
        })
    });

    beforeEach(() => {
      passportStub.install(app);
    });

    afterEach(() => {
      passportStub.logout();
      passportStub.uninstall();
    });



    it('should receive new comment for POST /comments', function() {
      // args are passed to `id` for passport.deserializeUser
      passportStub.login(1);

      return request(app)
        .post('/comments')
        .send({
          thread_id: 1,
          message: 'looks nice'
        })
        .expect(201)
        .then(res => {
          expect(res.body).to.have.all.keys('comment');
          expect(res.body.comment).to.have.all.keys('id', 'user', 'threadId', 'message', 'createdAt', 'updatedAt');
          expect(res.body.comment.message).to.equal('looks nice');
          expect(res.body.comment.user.id).to.equal(1);
        });
    });

    it('should return 401 when unauthorized for POST /comments', function() {
      return request(app)
        .post('/comments')
        .send({
          thread_id: 1,
          message: 'looks nice'
        })
        .expect(401)
        .then(res => {
          expect(res.body).to.have.all.keys('error');
          expect(res.body.error).to.have.all.keys('type', 'message');
          expect(res.body.error.type).to.equal('SIGNIN_REQUIRED');
        });
    });
  });
});
