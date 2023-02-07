import { Request, Response } from 'express';
import solicitacaoService from '../services/solicitacaoService';

const solicitacaoController = {
  async createSolicitacao(req: Request, res: Response) {
    const data = await solicitacaoService.createSolicitacao(req.body);
    // await loginService.validateUserByEmail(data.email);
    // const token = await loginService.makeToken(req.body);
    return res.status(200).json(data);
  },

  async list(req: Request, res: Response) {
    const solicitacao = await solicitacaoService.list();
    return res.status(200).json(solicitacao);
  }

};

export default solicitacaoController;
