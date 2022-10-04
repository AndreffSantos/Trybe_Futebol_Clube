import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/user';
import Team from '../database/models/team';

chai.use(chaiHttp);

const { expect } = chai;
const HOST = 'http://localhost:3001';
const LOGIN = {
  email: "admin@admin.com",
  password: "secret_admin"
};
const ADMININFO = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
};
const teams = [
  { id: 1, teamName: 'Avaí/Kindermann' },
  { id: 2, teamName: 'Bahia' },
  { id: 3, teamName: 'Botafogo' },
  { id: 4, teamName: 'Corinthians' },
  { id: 5, teamName: 'Cruzeiro' },
  { id: 6, teamName: 'Ferroviária' },
  { id: 7, teamName: 'Flamengo' },
  { id: 8, teamName: 'Grêmio' },
  { id: 9, teamName: 'Internacional' },
  { id: 10, teamName: 'Minas Brasília' },
  { id: 11, teamName: 'Napoli-SC' },
  { id: 12, teamName: 'Palmeiras' },
  { id: 13, teamName: 'Real Brasília' },
  { id: 14, teamName: 'Santos' },
  { id: 15, teamName: 'São José-SP' },
  { id: 16, teamName: 'São Paulo' },
];

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
    // it('Deve retornar um Error se um email não for informado', () => {});
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
