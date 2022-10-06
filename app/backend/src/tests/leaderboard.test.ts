import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import TeamModel from '../database/models/Team';
import MatchModel from '../database/models/Match';

import teamsMock from './mocks/teamsMock';
import { matchesFinished } from './mocks/matchMock';
import {
  globalClassification,
  homeClassification,
  awayClassification
} from './mocks/leaderboardMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota /leaderboard', () => {
  describe('Testa se /leaderboard retorna uma tabela com todos os times em ordem decrescente de pontos de todos os jogos (em casa e fora)', () => {

    before(async () => {
      sinon.stub(TeamModel, "findAll").resolves(teamsMock as TeamModel[]);
      sinon.stub(MatchModel, "findAll").resolves(matchesFinished as MatchModel[]);
    });

    after(()=>{
      (TeamModel.findAll as sinon.SinonStub).restore();
      (MatchModel.findAll as sinon.SinonStub).restore();
    })

    it('Testa se a rota /teams retorna um array de times', async () => {
      const response = await chai.request(app).get('/leaderboard');

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(globalClassification);  
    });
  });

  describe('Testa se /leaderboard/home retorna uma tabela com todos os times em ordem decrescente de pontos nos jogos feitos em casa', () => {
  
    before(async () => {
      sinon.stub(TeamModel, "findAll").resolves(teamsMock as TeamModel[]);
      sinon.stub(MatchModel, "findAll").resolves(matchesFinished as MatchModel[]);
    });

    after(()=>{
      (TeamModel.findAll as sinon.SinonStub).restore();
      (MatchModel.findAll as sinon.SinonStub).restore();
    })

    it('Testa se a rota /teams retorna um array de times', async () => {
      const response = await chai.request(app).get('/leaderboard/home');

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(homeClassification);
    });
  });

  describe('Testa se /leaderboard/home retorna uma tabela com todos os times em ordem decrescente de pontos nos jogos feitos em casa', () => {
  
    before(async () => {
      sinon.stub(TeamModel, "findAll").resolves(teamsMock as TeamModel[]);
      sinon.stub(MatchModel, "findAll").resolves(matchesFinished as MatchModel[]);
    });

    after(()=>{
      (TeamModel.findAll as sinon.SinonStub).restore();
      (MatchModel.findAll as sinon.SinonStub).restore();
    })

    it('Testa se a rota /teams retorna um array de times', async () => {
      const response = await chai.request(app).get('/leaderboard/away');

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(awayClassification);      
    });
  });

});
