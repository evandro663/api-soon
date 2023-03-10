import express from 'express';
import 'express-async-errors';
import errorHandlerMiddleware from './Middlewares/errorHandlerMiddleware';
import loginRoute from './routes/loginRoute';
import solicitacaoRoute from './routes/solicitacaoRoute';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    this.app.get('/', (req, res) => res.json({ ok: 'Api Online.' }));
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use('/login', loginRoute);
    this.app.use('/solicitacao', solicitacaoRoute);
    this.app.use(accessControl);
    this.app.use(errorHandlerMiddleware);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

export const { app } = new App();
