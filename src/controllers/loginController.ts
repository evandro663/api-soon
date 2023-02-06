import { Request, Response } from 'express';
import loginService from '../services/loginService';

const loginController = {
  async login(req: Request, res: Response) {
    const data = await loginService.validateBodyLogin(req.body);
    await loginService.validateUserByEmail(data.email);
    const token = await loginService.makeToken(req.body);
    return res.status(200).json({ token });
  },

  async loginValidate(req: Request, res: Response) {
    const token = req.headers.authorization;
    const tokenValidate = await loginService.validateAuthorization(token);
    const data = await loginService.readToken(tokenValidate);
    const userEmail = await loginService.validateUserByEmail(data.data.email);
    return res.status(200).json({ role: userEmail.email });
  },
};

export default loginController;
