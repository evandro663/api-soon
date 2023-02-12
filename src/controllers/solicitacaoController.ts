import { Request, Response } from 'express';
import solicitacaoService from '../services/solicitacaoService';
import veiculoService from '../services/veiculoService';

const solicitacaoController = {
  async add(req: Request, res: Response) {
    const request = req.body;
    await solicitacaoService.validateDefaultBody(request);
    await solicitacaoService.validateBodySolicitacao(request.Solicitacao);
    await veiculoService.validateBodyVeiculo(request.Veiculos);
    const data = await solicitacaoService.add(request);
    return res.status(200).json({
      message: 'Solicitação criada com sucesso!',
      Solicitacao: data[0],
      Veiculos: data[1]
    });

  },

  async listById(req: Request, res: Response) {
    const params: number = parseInt(req.params.id);
    const data: any = await solicitacaoService.listById(params);
    return res.status(200).json(data);
  },

  async listByCompany(req: Request, res: Response) {
    const request = req.body;
    await solicitacaoService.validateBodyLista(request);
    const data = await solicitacaoService.listByCompany(request.empresa, request.start_date, request.end_date);
    return res.status(200).json(data);
  }

};

export default solicitacaoController;
