import server from './../src/server';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;

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