import * as Joi from 'joi';
import { ISolicitacao } from '../interfaces';
import { NotFoundError, UnauthorizedError } from '../utils/erros';
import solicitacaoModel from '../database/models/solicitacao';

const solicitacaoService = {

  async createSolicitacao(data: any) {
    const solicitacao = await solicitacaoModel.create(data);
    return solicitacao;
  },

  async list(): Promise<any[]> {
    const solicitacao = await solicitacaoModel.findAll({ raw: true });
    return solicitacao;
  },
}

export default solicitacaoService;
