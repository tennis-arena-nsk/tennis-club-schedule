'use strict';

const request = require('supertest')
const expect = require('chai').expect
const app = require('../app.js')


describe('GET /', () => {
  console.log('Env: %s', process.env.NODE_ENV )

  it('should return 200 OK', (done) => {
    request(app)
      .get('/')
      .expect(200, done)
  })
})

describe('GET /login', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .get('/login')
      .expect(200, done);
  })
})

describe('GET /signup', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .get('/signup')
      .expect(200, done);
  })
})

describe('GET /random-url', () => {
  it('should return 404', (done) => {
    request(app)
      .get('/reset')
      .expect(404)
      .end( (err,res) => {
        if(err) return done(err)
        expect(res.status).to.equal(404)
        done()
      })
  });
});

after(() => {
  app.db.db.dropCollection('users')
  app.db.db.dropCollection('sessions')
})
