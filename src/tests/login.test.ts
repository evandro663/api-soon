import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';
import usersModel from '../database/models/user';
import User from '../database/models/user';

import { app } from '../app'

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login', () => {

  let chaiHttpResponse: Response;
  let sinonSandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sinonSandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sinonSandbox.restore();
  });

  it('Não é possível logar sem preencher todos os campos obrigatórios.', async () => {
    const loginObjectFail = {
      'email': '',
      "password": 'password'
    }
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(loginObjectFail)
    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.deep.equal({ message: "O preenchimento da chave 'email' é obrigatório." });
  });

  it('Não é possível logar com um email ou uma senha inválida.', async () => {
    const loginObjectFail = {
      'email': 'email@email.com',
      "password": 'password'
    }
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(loginObjectFail)
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Incorrect email or password.' });
  });

  it('É possível logal com sucesso e ter o retorno de um Token.', async () => {
    const fakeUser = User.build({
      id: 1,
      email: 'teste@teste.com',
      password: 'password',
    });
    sinonSandbox.stub(usersModel, 'findOne').resolves(fakeUser);
    const loginObject = {
      'email' : 'teste@teste.com',
      "password" : 'password'
    };
    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send(loginObject)
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body.token).to.exist;
  });
});
