import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchModel from '../database/models/Match';
import UserModel from '../database/models/User';
import TeamModel from '../database/models/Team';

import matchMock, { matchesInProgress, matchesFinished } from './mocks/matchMock';
import userMock from './mocks/userMock';
import { any } from 'sequelize/types/lib/operators';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota /matches', () => {
  describe('Testa se a rota GET /matches retorna os valores esperados', () => {

    before(async () => {
      sinon.stub(MatchModel, 'findAll').resolves(matchMock as MatchModel[]);
    });

    after(()=>{
      (MatchModel.findAll as sinon.SinonStub).restore();
    })

    it('Testa se a rota GET /matches retorna um array com todas as matches', async () => {
      const response = await chai.request(app).get('/matches');

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(matchMock);      
    });
  });

    //  ================================================================= //

  describe('Testa se a rota GET /matches/search retorna os valores esperados', () => {

    before(async () => {
      sinon.stub(MatchModel, 'findAll').resolves(matchesInProgress as MatchModel[]);
    });

    after(()=>{
      (MatchModel.findAll as sinon.SinonStub).restore();
    })

    it('Testa se a rota GET "/matches/search?inProgress=true" retorna um array de matches que estão em andamento', async () => {
      const response = await chai.request(app).get('/matches/search?inProgress=true');

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(matchesInProgress);
    });
  });

  //  ================================================================= //

  describe('Testa se a rota GET "/matches/search?inProgress=false" retorna os valores esperados', () => {
    const allMatches = {  }

    before(async () => {
      sinon.stub(MatchModel, 'findAll').resolves(matchesFinished as MatchModel[]);
    });

    after(()=>{
      (MatchModel.findAll as sinon.SinonStub).restore();
    })

    it('Testa se a rota GET /matches/search?inProgress=false retorna um array com todas as matches finalizadas', async () => {
      const response = await chai.request(app).get('/matches/search?inProgress=false');

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(matchesFinished);
    });
  });

    //  ================================================================= //

  describe('Testa se POST /matches funciona corretamente', () => {
    const login = { email: 'test@test.com', password: 'myPassword'};
    const [match] = matchMock;
    const newMatch = {
      homeTeam: 3,
      homeTeamGoals: 1,
      awayTeam: 8,
      awayTeamGoals: 1,
      inProgress: false
    };

    before(async () => {
      sinon.stub(MatchModel, 'create').resolves(match as MatchModel);
      sinon.stub(TeamModel, 'findByPk').resolves({ id: 1, teamName: 'mock' } as TeamModel);
      sinon.stub(UserModel, 'findOne').resolves({
        ...userMock
      } as UserModel);
    });

    after(()=>{
      (MatchModel.create as sinon.SinonStub).restore();
      (UserModel.findOne as sinon.SinonStub).restore();
      (TeamModel.findByPk as sinon.SinonStub).restore();
    });

    it('Testa se a rota POST /matches gera um erro ao não receber um token valido', async () => {
      const result = await chai.request(app).post('/matches').send(newMatch);
      const expectedMessage = { message: 'Token must be a valid token' };
      
      expect(result.status).to.equal(401);
      expect(result.body).to.deep.equal(expectedMessage);
    });

    it('Testa se a rota POST /matches adiciona uma nova match com os dados corretos', async () => {
      const loginResult = await chai.request(app).post('/login').send(login);
      const { token } = loginResult.body;
      const createMatch = await chai.request(app).post('/matches').send(newMatch)
        .set('authorization', token);
      const [result] = matchMock;
        
      expect(createMatch.status).to.equal(201);
      expect(createMatch.body).to.deep.equal(result);
    });
  });

  //  ================================================================= //

  describe('Testa se POST /matches funciona corretamente', () => {
    const login = { email: 'test@test.com', password: 'myPassword'};
    const [match] = matchMock;
    const newMatch = {
      'homeTeam': 3,
      'homeTeamGoals': 1,
      'awayTeam': 8,
      'awayTeamGoals': 1,
      'inProgress': false
    };

    before(async () => {
      sinon.stub(MatchModel, 'create').resolves(match as MatchModel);
      sinon.stub(TeamModel, 'findByPk').resolves({ id: 1, teamName: 'mock' } as TeamModel);
      sinon.stub(UserModel, 'findOne').resolves({
        ...userMock
      } as UserModel);
    });

    after(()=>{
      (MatchModel.create as sinon.SinonStub).restore();
      (UserModel.findOne as sinon.SinonStub).restore();
      (TeamModel.findByPk as sinon.SinonStub).restore();
    });

    it('Testa se a rota GET /matches gera um erro ao não receber um token valido', async () => {
      const result = await chai.request(app).post('/matches').send(newMatch);
      const expectedMessage = { message: 'Token must be a valid token' };
      
      expect(result.status).to.equal(401);
      expect(result.body).to.deep.equal(expectedMessage);
    });

    it('Testa se a rota GET /matches adiciona uma nova match com os dados corretos', async () => {
      const loginResult = await chai.request(app).post('/login').send(login);
      const { token } = loginResult.body;
      const createMatch = await chai.request(app).post('/matches').send(newMatch)
        .set('authorization', token);
      const [result] = matchMock;
        
      expect(createMatch.status).to.equal(201);
      expect(createMatch.body).to.deep.equal(result);
    });
  });

  //  ================================================================= //

  describe('Testa se PATCH /matches/id/finish finaliza a partida a partir do id enviado', () => {
    const login = { email: 'test@test.com', password: 'myPassword'};
    const matchToEdit = {
      id: 4,
      homeTeam: 3,
      homeTeamGoals: 1,
      awayTeam: 8,
      awayTeamGoals: 1,
      inProgress: true
    };

    before(async () => {
      sinon.stub(MatchModel, 'update').resolves();
      sinon.stub(MatchModel, 'findByPk').resolves(matchToEdit as MatchModel);
      sinon.stub(UserModel, 'findOne').resolves({
        ...userMock
      } as UserModel);
    });

    after(()=>{
      (MatchModel.update as sinon.SinonStub).restore();
      (MatchModel.findByPk as sinon.SinonStub).restore(); 
      (UserModel.findOne as sinon.SinonStub).restore();
    });

    it('Verifica se a match com o id enviado teve o valor "inProgress" alterado para false', async () => {
      const loginResult = await chai.request(app).post('/login').send(login);
      const { token } = loginResult.body;
      const result = await chai.request(app).patch('/matches/4/finish').set('authorization', token);
      const expectedMessage = { message: 'Finished' };

      expect(result.status).to.equal(200);
      expect(result.body).to.deep.equal(expectedMessage);
    });
  });

    //  ================================================================= //

    describe('Testa se PATCH /matches/id alterar os gols a partida a partir do id enviado', () => {
      const login = { email: 'test@test.com', password: 'myPassword'};
      const matchToEdit = {
        id: 4,
        homeTeam: 3,
        homeTeamGoals: 1,
        awayTeam: 8,
        awayTeamGoals: 1,
        inProgress: true
      };
      const goalsUpdate = {
        homeTeamGoals: 2,
        awayTeamGoals: 1
      }
  
      before(async () => {
        sinon.stub(MatchModel, 'update').resolves();
        sinon.stub(MatchModel, 'findByPk').resolves(matchToEdit as MatchModel);
        sinon.stub(UserModel, 'findOne').resolves({
          ...userMock
        } as UserModel);
      });
  
      after(()=>{
        (MatchModel.update as sinon.SinonStub).restore();
        (MatchModel.findByPk as sinon.SinonStub).restore(); 
        (UserModel.findOne as sinon.SinonStub).restore();
      });
  
      it('Verifica se a os gols estão sendo alterados corretamente', async () => {
        const loginResult = await chai.request(app).post('/login').send(login);
        const { token } = loginResult.body;
        const result = await chai.request(app).patch('/matches/4').send(goalsUpdate)
        .set('authorization', token);
        const expectedMessage = { message: 'Goals updated' };      
  
        expect(result.status).to.equal(200);
        expect(result.body).to.deep.equal(expectedMessage);
      });
    });
});