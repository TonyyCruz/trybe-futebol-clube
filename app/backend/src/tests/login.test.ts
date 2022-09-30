import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';

import userMock from './mocks/user';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa Login', () => {

  const login = { email: 'test@test.com', password: 'mypassword'}

  before(async () => {
    sinon.stub(User, "findOne").resolves({
        ...userMock
      } as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('Testa caso o email e senha estejam corretos', async () => {
    const response = await chai.request(app).post('/login').send(login);

    expect(response.status).to.equal(200);
  });

  it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  });
});
