const request = require('supertest');
const app = require('../app');
const chai = require('chai');
const expect = chai.expect;
// const assert = require('assert');
const fixtures = require('sequelize-fixtures');
const passportStub = require('passport-stub');
const models  = require('../models');

describe('express: /threads', function() {
  describe('GET /threads', function() {
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


    it('should have two threads', function() {
      return models.Thread.findAll().then(threads => {
        expect(threads).to.have.lengthOf(2);
      });
    });

    it('should respond with two posts for /threads', function() {
      return request(app)
        .get('/threads')
        .expect(200)
        .then(res => {
          expect(res.body).to.have.all.keys('threads');
          expect(res.body.threads).to.have.lengthOf(2);
          expect(res.body.threads[0]).to.include.all.keys('posts');
        })
    });
  });

  describe('POST /threads', function() {
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



    it('should receive new thread for POST /threads', function() {
      // args are passed to `id` for passport.deserializeUser
      passportStub.login(1);

      return request(app)
        .post('/threads')
        .send({
          image: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8uU3iIgAG0QKKL7cTLwAAAABJRU5ErkJggg==',
          caption: 'orange'
        })
        .expect(201)
        .then(res => {
          expect(res.body).to.have.all.keys('thread');
          expect(res.body.thread).to.have.all.keys('id', 'isOpen', 'posts', 'createdAt', 'updatedAt');
          expect(res.body.thread.posts).to.have.lengthOf(1);
        });
    });

    it('should return 401 when unauthorized for POST /threads', function() {
      return request(app)
        .post('/threads')
        .send({
          thread_id: 1,
          image: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8uU3iIgAG0QKKL7cTLwAAAABJRU5ErkJggg==',
          caption: 'orange'
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
