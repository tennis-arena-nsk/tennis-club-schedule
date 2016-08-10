"use strict";

const supertest = require('supertest');
const should = require('should')
const app = require('../app.js');
const api = supertest(app)

describe('Create test users: ', () => {

  it('should create first user', () => {
    api.post('/signup')
      .set('Accept', 'application/json')
      .send( {
        "email": "testuser1@example.com",
        "password" : "testuser1"
      })
      .expect(201)
      .end( (err, res) => {
        should.exists(res)
        should.not.exist(err)
        should(res.statusCode).be.exactly(201)
        should(res.body).have.property('email')
        should(res.body.email).not.be.equal( null )
        should(res.body.email).be.exactly( 'testuser1@example.com' )
      })
  });

  it('should create second user', () => {
    api.post('/signup')
      .set('Accept', 'application/json')
      .send( {
        "email": "testuser2@example.com",
        "password" : "testuser2"
      })
      .expect(201)
      .end( (err, res) => {
        should.exists(res)
        should.not.exist(err)
        should(res.statusCode).be.exactly(201)
        should(res.body).have.property('email')
        should(res.body.email).not.be.equal( null )
        should(res.body.email).be.exactly( 'testuser2@example.com' )
      })
  });

  it('should NOT create user with existing email', () => {
    api.post('/signup')
      .set('Accept', 'application/json')
      .send( {
        "email": "testuser1@example.com",
        "password" : "testuser1"
      })
      .expect(400)
      .end( (err, res) => {
        should.exist(err)
      })
  });

  after( () => {
    app.db.db.dropCollection('users')
    app.db.db.dropCollection('sessions')
  })


});

