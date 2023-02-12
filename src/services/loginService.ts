import * as Joi from 'joi';
import { sign, verify } from 'jsonwebtoken';
import { ValidationError, UnauthorizedError } from '../utils/erros';
import { ILogin, IJwt } from '../interfaces/index';
import usersModel from '../database/models/user';
import { loginSchema } from '../utils/joi';

const loginService = {

  async validateBodyLogin(unknown: ILogin) {
    return await loginSchema.validateAsync(unknown);
  },
  
  async validateUserByEmail(email: string) {
    const userModel = await usersModel.findOne({
      where: { email },
    });
    if (!userModel) {
      throw new UnauthorizedError('Incorrect email or password.');
    }
    return userModel;
  },

  async makeToken(user: string) {
    const payload = { data: user };
    const secret = process.env.JWT_SECRET || 'secret';
    const token = sign(payload, secret);
    return token;
  },

  async readToken(token: string) {
    try {
      const secret = process.env.JWT_SECRET || 'secret';
      const decode = verify(token, secret);
      return decode as IJwt;
    } catch (error) {
      throw new UnauthorizedError('Token must be a valid token.');
    }
  },
  async validateAuthorization(unknown: string | undefined) {
    const schema = Joi.string().required();
    try {
      const result = await schema.validateAsync(unknown);
      return result;
    } catch (error) {
      throw new UnauthorizedError('Token not found.');
    }
  },
};

export default loginService;
