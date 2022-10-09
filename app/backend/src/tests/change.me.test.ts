import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/user';
import Team from '../database/models/team';

chai.use(chaiHttp);

const { expect } = chai;
import { HOST, LOGIN, teams } from './tests_helpers';

describe('Backend', () => {
  describe('Rota "/"', () => {
    it('Deve retornar status code 200.', async () => {
      const response = await chai.request(app).get('/');
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({
        ok: true,
      });
    });
  });

  describe('Rota "/login"', () => {
    it('Deve retornar uma response com uma propriedade token.', async () => {
      const response = await chai.request(HOST).post('/login').send(LOGIN);
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('token');
    });
  });

  describe('Rota "/login/validate"', () => {
    it('Deve retornar uma response com a propriedade role.', async () => {
      const token = await chai.request(HOST).post('/login').send(LOGIN);
      const response = await chai.request(HOST).get('/login/validate').set('Authorization', token.body.token);
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('role');
    });
  });

  describe('Rota "/teams"', () => {
    before(() => {
      sinon.stub(Team, 'findAll').resolves(teams as Team[]);
    });

    after(() => {
      sinon.restore()
    });
    it('Deve retornar uma lista com todos os times.', async () => {
      const response = await chai.request(HOST).get('/teams');
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(teams);
    });
  });

});
