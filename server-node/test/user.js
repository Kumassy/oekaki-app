const request = require('supertest');
const app = require('../app');
const chai = require('chai');
const expect = chai.expect;
// const assert = require('assert');
const fixtures = require('sequelize-fixtures');
const models  = require('../models');

describe('express: /users', function() {
  describe('GET /users', function() {
    this.timeout(5000);

    before(function() {
      return models.sequelize.sync({force: true })
        .then(() => {
          return fixtures.loadFile('fixtures/users.yaml', models)
        })
    });


    it('should have two users', function() {
      return models.User.findAll().then(users => {
        expect(users).to.have.lengthOf(2);
      });
    });

    it('should have one account for user kumassy', function() {
      return models.User.findOne({ where: {username: 'kumassy'}, include: [ models.Account ] }).then(user => {
        expect(user.username).to.equal('kumassy');
        expect(user.Accounts).to.have.lengthOf(1);
        expect(user.Accounts[0].provider).to.equal('twitter');
      });
    });

    it('should respond with two users for /users', function() {
      return request(app)
        .get('/users')
        .expect(200)
        .then(res => {
          expect(res.body).to.have.all.keys('users');
          expect(res.body.users).to.have.lengthOf(2);
        })
    });

    it('should respond with one user for /users/1', function() {
      return request(app)
        .get('/users/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.have.all.keys('user');
          expect(res.body.user).to.have.all.keys('id', 'username', 'avatar', 'createdAt', 'updatedAt');
        })
    });

  });
});
