import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/User';

import userMock from './mocks/userMock';
import { and } from 'sequelize/types';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota /login', () => {
  describe('Testa casos de sucesso', () => {

    const login = { email: 'test@test.com', password: 'myPassword'}

    before(async () => {
      sinon.stub(UserModel, "findOne").resolves({
          ...userMock
        } as UserModel);
    });

    after(()=>{
      (UserModel.findOne as sinon.SinonStub).restore();
    })

    it('Testa se caso o email e senha estejam corretos retorna o status 200 e um objeto token', async () => {
      const result = await chai.request(app).post('/login').send(login);
      const response = JSON.parse(result.text);

      expect(result.status).to.equal(200);
      expect(response).to.have.key('token');
    });

    it('Testa se a rota /login/validate retorna a role do usuario ao passar um token valido', async () => {
      const loginResult = await chai.request(app).post('/login').send(login);
      const authorization = await JSON.parse(loginResult.text).token;
      const validateResult = await chai.request(app).get('/login/validate')
        .set('authorization', String(authorization));

      const validateResponse =  JSON.parse(validateResult.text);

      expect(loginResult.status).to.equal(200);
      expect(validateResponse).to.be.deep.equal({ role:'userMock' });

    });

  });
});
