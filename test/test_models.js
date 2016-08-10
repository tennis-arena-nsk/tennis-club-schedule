'use strict';
const chai = require('chai');
const expect = chai.expect;
const User = require('../models/User');

describe('User Model', () => {
  it('should create a new user', () => {
    const user = new User({
      email: 'test@gmail.com',
      password: 'password'
    });
    user.save((err) => {
      expect(err).to.be.null;
      expect(user.email).to.equal('test@gmail.com');
      expect(user).to.have.property('createdAt');
      expect(user).to.have.property('updatedAt');
    });
  });

  it('should not create a user with the same email', () => {
    const user = new User({
      email: 'test@gmail.com',
      password: 'password'
    });
      user.save( (err, savedUser) => {
        expect(err).to.be.defined;
        expect( err.code ).to.be.defined;
        expect( err.code ).to.equal(11000);
      })
  });

  it('should find user by email', () => {
    User.findOne({ email: 'test@gmail.com' }, (err, user) => {
      expect(err).to.be.null;
      expect(user.email).to.equal('test@gmail.com');
    });
  });

  it('should delete a user', () => {
    User.remove({ email: 'test@gmail.com' }, (err) => {
      expect(err).to.be.null;
    });
  });
});
