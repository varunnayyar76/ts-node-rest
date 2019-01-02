import server from './../src/server';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Authentication Functions', () => {
  it('POST /auth/login', () => {
    return chai.request(server).post('/auth/login')
      .then(res => {
        chai.expect(res.status).to.eql(400);
      })
  })
})