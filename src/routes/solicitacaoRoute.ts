import { Router } from 'express';
import solicitacaoController from '../controllers/solicitacaoController';
import tokenValidationMiddleware from '../Middlewares/tokenValidationMiddleware';

const solicitacaoRoute = Router();

solicitacaoRoute.post('/', tokenValidationMiddleware, solicitacaoController.add);
solicitacaoRoute.get('/:id', tokenValidationMiddleware, solicitacaoController.listById);
solicitacaoRoute.post('/detalhes', tokenValidationMiddleware, solicitacaoController.listByCompany);

export default solicitacaoRoute;
