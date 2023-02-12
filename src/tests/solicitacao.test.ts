import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';
import solicitacaoModel from '../database/models/solicitacao';
import { DataBaseError } from '../utils/erros';
import { app } from '../app';
import { createFakeSolicitacao, createSolicitacaoBody, createSolicitacaoBodyGuinchoFail, createSolicitacaoBodyCegonhaFail, createSolicitacaoBodyFail, formatDate } from './utils'

chai.use(chaiHttp);

const { expect } = chai;

describe('Solicitacao', () => {
  let chaiHttpResponse: ChaiHttp.Response;
  let sinonSandbox: sinon.SinonSandbox;
  let token: string;

  before(async () => {
    const loginObject = {
      'email': 'admin@admin.com',
      "password": '12345'
    };
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(loginObject);
    token = chaiHttpResponse.body.token;
  });

  beforeEach(() => {
    sinonSandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sinonSandbox.restore();
  });

  describe('GET /solicitacao/:id', () => {
    it('Se o ID da solicitação for válido, deve retornar um objeto com as informações e Status 200.', async () => {
      const fakeSolicitacao = createFakeSolicitacao();

      sinonSandbox.stub(solicitacaoModel, 'findOne').resolves(fakeSolicitacao);

      chaiHttpResponse = await chai
        .request(app)
        .get('/solicitacao/1')
        .set('Authorization', `${token}`);

      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal({
        ...fakeSolicitacao.toJSON(),
        created_at: fakeSolicitacao.created_at.toISOString(),
      });
    });

    it('Deve retornar 404 se o ID não existir.', async () => {
      const id = 999;

      sinonSandbox.stub(solicitacaoModel, 'findOne').resolves(null);

      chaiHttpResponse = await chai
        .request(app)
        .get(`/solicitacao/${id}`)
        .set('Authorization', `${token}`);

      expect(chaiHttpResponse.status).to.equal(404);
      expect(chaiHttpResponse.body.message).to.equal(`Id '${id}' informado não corresponde a nenhuma solicitação válida.`);
    });

    it('Deve retornar 500 se ocorrer um erro ao buscar a solicitação.', async () => {
      const id = 1;

      sinonSandbox.stub(solicitacaoModel, 'findOne').throws(new DataBaseError('Database error'));

      chaiHttpResponse = await chai
        .request(app)
        .get(`/solicitacao/${id}`)
        .set('Authorization', `${token}`);

      expect(chaiHttpResponse.status).to.equal(500);

      expect(chaiHttpResponse.body.message).to.equal(`Ocorreu um erro ao buscar a solicitação com o ID '${id}'. Database error`);
    });
  }),

    describe('POST /solicitacao/', () => {
      let solicitacaoBody: any;
      let solicitacaoBodyFail: any;
      let solicitacaoBodyGincho: any;
      let solicitacaoBodyCegonha: any;

      before(() => {
        solicitacaoBody = createSolicitacaoBody();
        solicitacaoBodyFail = createSolicitacaoBodyFail();
        solicitacaoBodyGincho = createSolicitacaoBodyGuinchoFail();
        solicitacaoBodyCegonha = createSolicitacaoBodyCegonhaFail();
      });

      it('Deve criar uma nova solicitação e retornar um Status 200.', async () => {

        chaiHttpResponse = await chai
          .request(app)
          .post('/solicitacao/')
          .set('Authorization', `${token}`)
          .send(solicitacaoBody);

        expect(chaiHttpResponse.status).to.equal(200);
      });

      it('Deve retornar um erro 400 ao tentar criar uma solicitação sem informar a chave Solicitacao.', async () => {

        const response = chaiHttpResponse = await chai
          .request(app)
          .post('/solicitacao/')
          .set('Authorization', `${token}`)
          .send(solicitacaoBodyFail);

        expect(chaiHttpResponse.status).to.equal(400),
          expect(response.body.message).to.equal("A chave 'Solicitacao' é obrigatória para esta requisição.");

      });

      it('Deve retornar um erro 400 ao tentar criar uma solicitação sem informar todas as chaves.', async () => {
        const data = {
          "Solicitacao": {
            "tipo_servico": "Guincho",
            "coordenadas_origem": "-23.5489, -46.6388",
            "empresa": "Empresax"
          },
          "Veiculos": [{
            "placa": "ABCD1234",
            "modelo": "Gol",
            "marca": "Volkswagen",
            "ano": "2001",
            "": "-23.5489, -46.6388"
          }]
        };
        const deletedKey = 'coordenadas_entrega';
        const key = 'Veiculos';

        const response = await chai
          .request(app)
          .post('/solicitacao/')
          .set('Authorization', `${token}`)
          .send(data);

        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal(`A chave '${deletedKey}' é obrigatória para a chave '${key}'.`);
      });

      it('Deve retornar um erro 400 ao tentar criar solicitação sem veículos.', async () => {
        const body = {
          Solicitacao: {
            tipo_servico: "Cegonha",
            coordenadas_origem: "-25.084749273014125, -50.16177823356103",
            empresa: "DAF"
          },
          Veiculos: []
        };

        const response = await chai
          .request(app)
          .post('/solicitacao/')
          .set('Authorization', `${token}`)
          .send(body);

        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal('Deve ser informado pelo menos um veículo para a Solicitação.');
      });

      it('Deve lançar um erro 400 de validação ao criar uma solicitação com mais de 2 veículos para Guincho.', async () => {

        const response = await chai
          .request(app)
          .post('/solicitacao/')
          .set('Authorization', `${token}`)
          .send(solicitacaoBodyGincho);

        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal("Tipo de serviço 'Guincho' pode ter no máximo 2 veículos.");
      });

      it('Deve lançar um erro de validação ao criar uma solicitação com mais de 11 veículos para Cegonha.', async () => {

        const response = await chai
          .request(app)
          .post('/solicitacao/')
          .set('Authorization', `${token}`)
          .send(solicitacaoBodyCegonha);

        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal("Tipo de serviço 'Cegonha' pode ter no máximo 11 veículos.");
      });
    });

  describe('GET /solicitacao/listByCompany/:empresa/:startDate/:endDate', () => {
    let startDate: string;
    let endDate: string;
    let solicitacaoBody: any;

    before(() => {
      solicitacaoBody = createSolicitacaoBody();
      startDate = '2022-02-01';
      endDate = '2022-02-31';
    });

    it('Deve retornar um erro 404 ao tentar listar solicitações de uma empresa inexistente.', async () => {
      const fakeEmpresa = 'EmpresaFalsa';
      const expectedErrorMessage = `A empresa '${fakeEmpresa}' não foi encontrada na base de dados.`;

      const data = {
        empresa: fakeEmpresa,
        start_date: startDate,
        end_date: endDate
      }

      const response = await chai
        .request(app)
        .post('/solicitacao/detalhes')
        .send(data)
        .set('Authorization', `${token}`);

      expect(response.status).to.equal(404);
      expect(response.body.message).to.equal(expectedErrorMessage);
    });

    it('Deve retornar um erro 404 ao tentar listar solicitações de uma empresa com período sem resultados.', async () => {
      const empresa = 'DAF';
      const startDate = '2150-02-01';
      const endDate = '2150-02-17';
      const data = {
        empresa,
        start_date: startDate,
        end_date: endDate
      }
      const expectedErrorMessage = `Não foram encontrados dados para a empresa '${empresa}' no período entre ${startDate} e ${endDate}.`;

      const response = await chai
        .request(app)
        .post('/solicitacao/detalhes')
        .send(data)
        .set('Authorization', `${token}`);

      expect(response.status).to.equal(404);
      expect(response.body.message).to.equal(expectedErrorMessage);
    });

    it('Deve listar solicitações de uma empresa com sucesso.', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/solicitacao/')
        .set('Authorization', `${token}`)
        .send(solicitacaoBody);

      expect(chaiHttpResponse.status).to.equal(200);

      const data = formatDate(chaiHttpResponse.body.Solicitacao.created_at);
      const dataSum = formatDate(new Date(data).setDate(new Date(data).getDate() + 1));

    const objData = {
      empresa : chaiHttpResponse.body.Solicitacao.empresa,
      start_date: data,
      end_date: dataSum
    }

    const response = await chai
      .request(app)
      .post('/solicitacao/detalhes')
      .send(objData)
      .set('Authorization', `${token}`);

    expect(response.status).to.equal(200);
  });
});
  
})

