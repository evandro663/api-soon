import { Router } from 'express';
import solicitacaoController from '../controllers/solicitacaoController';

const solicitacaoRoute = Router();

solicitacaoRoute.post('/', solicitacaoController.createSolicitacao);
solicitacaoRoute.get('/', solicitacaoController.list);

export default solicitacaoRoute;
