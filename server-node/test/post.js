const request = require('supertest');
const app = require('../app');
const chai = require('chai');
const expect = chai.expect;
// const assert = require('assert');
const fixtures = require('sequelize-fixtures');
const passportStub = require('passport-stub');
const models  = require('../models');

describe('express: /posts', function() {
  describe('GET /posts', function() {
    this.timeout(5000);

    before(function() {
      return models.sequelize.sync({force: true })
        .then(() => {
          return fixtures.loadFile('fixtures/users.yaml', models)
        })
        .then(() => {
          return fixtures.loadFile('fixtures/threads.yaml', models)
        })
    });


    it('should have two posts', function() {
      return models.Post.findAll().then(posts => {
        expect(posts).to.have.lengthOf(2);
      });
    });

    it('should respond with two posts for /posts', function() {
      return request(app)
        .get('/posts')
        .expect(200)
        .then(res => {
          expect(res.body).to.have.all.keys('posts');
          expect(res.body.posts).to.have.lengthOf(2);
        })
    });
  });

  describe('POST /posts', function() {
    this.timeout(5000);

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



    it('should receive new post for POST /post', function() {
      // args are passed to `id` for passport.deserializeUser
      passportStub.login(2);

      return request(app)
        .post('/posts')
        .send({
          thread_id: 1,
          image: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8zcBwEQAEhwG+eN4+FAAAAABJRU5ErkJggg==',
          caption: 'apple'
        })
        .expect(201)
        .then(res => {
          expect(res.body).to.have.all.keys('post');
          expect(res.body.post).to.have.all.keys('id', 'user', 'thread_id', 'image', 'caption', 'createdAt', 'updatedAt');
          expect(res.body.post.user.id).to.equal(2);
        });
    });

    it('should return 401 when unauthorized for POST /post', function() {
      return request(app)
        .post('/posts')
        .send({
          thread_id: 1,
          image: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8zcBwEQAEhwG+eN4+FAAAAABJRU5ErkJggg==',
          caption: 'apple'
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
