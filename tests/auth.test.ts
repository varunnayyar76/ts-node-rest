process.env.NODE_ENV === 'TEST'
import server from './../src/server';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';

import * as mongoose from "mongoose";
const Users = mongoose.model('User')

chai.use(chaiHttp);
const expect = chai.expect;

describe('Drop the users collection', function () {
  before(function (done) {
    Users.remove({}, (err) => {
      console.error(err)
      done()
    })
  });

  describe('Registration API request: POST auth/register', () => {
    it('Request without parameters should return status 400', () => {
      return chai
        .request(server)
        .post('/auth/register')
        .then(res => {
          chai.expect(res.status).to.eql(400);
          chai.expect(res.body.message).to.eql('Password is required.');
        })
    })

    it('Request without required parameters should return status 400', () => {
      return chai
        .request(server)
        .post('/auth/register')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({ email: 'test@gmail.com', password: 'test' })
        .then(res => {
          chai.expect(res.status).to.eql(400);
        })
    })

    it('Firstname/Lastname length should be between 2-60, should return status 400', () => {
      return chai
        .request(server)
        .post('/auth/register')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({ email: 'test@gmail.com', password: 'test', firstname: 'q', lastname: 'q' })
        .then(res => {
          chai.expect(res.status).to.eql(400);
        })
    })

    it('Invalid email format should return status 400', () => {
      return chai
        .request(server)
        .post('/auth/register')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({ email: 'test.com', password: 'test', firstname: 'jon', lastname: 'doe' })
        .then(res => {
          chai.expect(res.status).to.eql(400);
        })
    })

    it('Create account with valid data should return status 200', () => {
      return chai
        .request(server)
        .post('/auth/register')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({ email: 'varun@gmail.com', password: 'test', firstname: 'jon', lastname: 'doe' })
        .then(res => {
          chai.expect(res.status).to.eql(200);
        })
    })

    it('Duplicate email should return status 400', () => {
      return chai
        .request(server)
        .post('/auth/register')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({ email: 'varun@gmail.com', password: 'test', firstname: 'jon', lastname: 'doe' })
        .then(res => {
          chai.expect(res.status).to.eql(400);
        })
    })
  })

  describe('Login API request: POST /auth/login', () => {
    it('Request without credentails should return status 400', () => {
      return chai
        .request(server)
        .post('/auth/login')
        .then(res => {
          chai.expect(res.status).to.eql(400);
          chai.expect(res.body.message).to.eql('Email or Password not provided.');
        })
    })

    it('Request with invalid Credentails should return status 401', () => {
      return chai
        .request(server)
        .post('/auth/login')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({ email: 'test@gmail.com', password: 'test' })
        .then(res => {
          chai.expect(res.status).to.eql(401);
          chai.expect(res.body.message).to.eql('Invalid username or password.');
        })
    })

    it('Request with valid credentials should return status 200', () => {
      return chai
        .request(server)
        .post('/auth/login')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({ email: 'varun@gmail.com', password: 'test' })
        .then(res => {
          chai.expect(res.status).to.eql(200);
        })
    })
  })

});