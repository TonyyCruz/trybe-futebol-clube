import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModel from '../database/models/Team';

import teamsMock from './mocks/teamsMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota /teams', () => {
  describe('Testa se /teams retorna os valores esperados', () => {

    before(async () => {
      sinon.stub(TeamModel, "findAll").resolves(teamsMock as TeamModel[]);
    });

    after(()=>{
      (TeamModel.findAll as sinon.SinonStub).restore();
    })

    it('Testa se a rota /teams retorna um array de times', async () => {
      const response = await chai.request(app).get('/teams');

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(teamsMock);
    });
  });

  describe('Testa se /teams/:id retorna os valores esperados', () => {
    const [team] = teamsMock;

    before(async () => {
      sinon.stub(TeamModel, "findByPk").resolves(team as TeamModel);
    });

    after(()=>{
      (TeamModel.findByPk as sinon.SinonStub).restore();
    })

    it('Testa se a rota /teams/:id retorna o time com o id especificado', async () => {
      const response = await chai.request(app).get('/teams/1');

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(team);
    });
  });
});
