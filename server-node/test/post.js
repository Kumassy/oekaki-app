const request = require('supertest');
const app = require('../app');
const chai = require('chai');
const expect = chai.expect;
// const assert = require('assert');
const fixtures = require('sequelize-fixtures');
const passportStub = require('passport-stub');
const models  = require('../models');

describe('express: /posts', function() {
  // describe('GET /posts', function() {
  //   this.timeout(5000);
  //
  //   before(function() {
  //     return models.sequelize.sync({force: true })
  //       .then(() => {
  //         return fixtures.loadFile('fixtures/posts.yaml', models)
  //       })
  //   });
  //
  //
  //   it('should have two users', function() {
  //     return models.User.findAll().then(users => {
  //       expect(users).to.have.lengthOf(2);
  //     });
  //   });
  // });

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
        .then(() => {
          passportStub.install(app);
        })
    });

    after(() => {
      passportStub.uninstall();
    });



    it('should receive new post', function() {
      // args are passed to `id` for passport.deserializeUser
      passportStub.login(2);

      return request(app)
        .post('/posts')
        .send({
          thread_id: 1,
          image: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8zcBwEQAEhwG+eN4+FAAAAABJRU5ErkJggg==',
          caption: 'apple'
        })
        .expect(200)
        .then(res => {
          expect(res.body).to.have.all.keys('post');
          expect(res.body.post).to.have.all.keys('id', 'UserId', 'ThreadId', 'ImageId', 'caption', 'createdAt', 'updatedAt');
          expect(res.body.post.UserId).to.equal(2);
        });
    });
  });
});
