import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchModel from '../database/models/Match';
import UserModel from '../database/models/User';
import TeamModel from '../database/models/Team';

import matchMock from './mocks/matchMock';
import userMock from './mocks/userMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota /match', () => {
  describe('Testa se GET /match retorna um array com todas as matches', () => {

    before(async () => {
      sinon.stub(MatchModel, "findAll").resolves(matchMock as MatchModel[]);
    });

    after(()=>{
      (MatchModel.findAll as sinon.SinonStub).restore();
    })

    it('Testa se a rota /match retorna um array de matches', async () => {
      const response = await chai.request(app).get('/matches');

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(matchMock);
    });
  });

  describe('Testa se POST /match funciona corretamente', () => {
    const login = { email: 'test@test.com', password: 'myPassword'};
    const [match] = matchMock;
    const newMatch = {
      "homeTeam": 3,
      "homeTeamGoals": 1,
      "awayTeam": 8,
      "awayTeamGoals": 1,
      "inProgress": false
    };

    before(async () => {
      sinon.stub(MatchModel, "create").resolves(match as MatchModel);
      sinon.stub(TeamModel, "findByPk").resolves({ id: 1, teamName: 'mock' } as TeamModel);
      sinon.stub(UserModel, "findOne").resolves({
        ...userMock
      } as UserModel);
    });

    after(()=>{
      (MatchModel.create as sinon.SinonStub).restore();
      (UserModel.findOne as sinon.SinonStub).restore();
      (TeamModel.findByPk as sinon.SinonStub).restore();
    });

    it('Testa se a rota GET /match gera um erro ao não receber um token valido', async () => {
      const result = await chai.request(app).post('/matches').send(newMatch);
      const expectedMessage = { message: 'Token must be a valid token' };
      
      expect(result.status).to.equal(401);
      expect(result.body).to.deep.equal(expectedMessage);
    });

    it('Testa se a rota GET /match adiciona uma nova match com os dados corretos', async () => {
      const loginResult = await chai.request(app).post('/login').send(login);
      const { token } = loginResult.body;
      const createMatch = await chai.request(app).post('/matches').send(newMatch)
        .set('authorization', token);
      const [result] = matchMock;
        
      expect(createMatch.status).to.equal(201);
      expect(createMatch.body).to.deep.equal(result);
    });
  });
});