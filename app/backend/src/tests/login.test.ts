import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/User';

import userMock from './mocks/userMock';

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

      expect(result.status).to.equal(200);
      expect(result.body).to.have.key('token');
    });

    it('Testa se a rota /login/validate retorna a role do usuario ao passar um token valido', async () => {
      const loginResult = await chai.request(app).post('/login').send(login);
      const { token } = loginResult.body;
      const validateResult = await chai.request(app).get('/login/validate')
        .set('authorization', token);

      expect(loginResult.status).to.equal(200);
      expect(validateResult.body).to.be.deep.equal({ role:'userMock' });

    });
  });

  //  ========================================================================= //

  describe('Testa casos de falha', () => {

    before(async () => {
      sinon.stub(UserModel, "findOne").resolves({
          ...userMock
        } as UserModel);
    });

    after(()=>{
      (UserModel.findOne as sinon.SinonStub).restore();
    })

    it('Testa se caso o email esteja com dados invalidos', async () => {
      const wrongEmail = { email: 'invalidTest.com', password: 'myPassword'};
      const errorMessage = { message: 'Incorrect email or password' }

      const result = await chai.request(app).post('/login').send(wrongEmail);

      expect(result.status).to.equal(401);
      expect(result.body).to.be.deep.equal(errorMessage);
    });

    it('Testa se caso o password esteja com dados invalidos', async () => {
      const wrongPassword = { email: 'test@test.com', password: 'short'};
      const errorMessage = { message: 'Password need to have at least 6 characters' }

      const result = await chai.request(app).post('/login').send(wrongPassword);

      expect(result.status).to.equal(400);
      expect(result.body).to.be.deep.equal(errorMessage);
    });

  });
});
