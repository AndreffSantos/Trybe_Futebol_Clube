import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/user';

chai.use(chaiHttp);

const { expect } = chai;
const HOST = 'http://localhost:3001';
const LOGIN = {
  username: 'Admin',
  pasword: '123456',
}
const ADMININFO = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
}

describe('Rota "/"', () => {
  describe('GET', () => {
    it('Deve retornar status code 200.', async () => {
      const response = await chai.request(app).get('/');
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({
        ok: true,
      });
    });
  });
});

describe('Rota "/login"', () => {
  describe('POST', () => {
    before(() => {
      sinon.stub(User, 'findOne').resolves(ADMININFO as User);
    });

    after(() => {
      sinon.restore();
    });

    it('Deve retornar uma response com uma propriedade token.', async () => {
      const response = await chai.request(HOST).post('/login').send(LOGIN);
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('token');
    });
  });
});
