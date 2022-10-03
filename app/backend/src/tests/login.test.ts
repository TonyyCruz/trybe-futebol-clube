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

  const login = { email: 'test@test.com', password: 'myPassword'}

  before(async () => {
    sinon.stub(UserModel, "findOne").resolves({
        ...userMock
      } as UserModel);
  });

  after(()=>{
    (UserModel.findOne as sinon.SinonStub).restore();
  })

  it('Testa caso o email e senha estejam corretos', async () => {
    const response = await chai.request(app).post('/login').send(login);

    expect(response.status).to.equal(200);
  });

});
