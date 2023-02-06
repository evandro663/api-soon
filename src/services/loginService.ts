import * as Joi from 'joi';
import { sign, verify } from 'jsonwebtoken';
import { ValidationError, UnauthorizedError } from '../utils/erros';
import { ILogin, IJwt } from '../interfaces/index';
import usersModel from '../database/models/user';

const loginService = {

  async validateBodyLogin(unknown: ILogin) {
    const schema = Joi.object({
      email: Joi.string().required().email().max(255),
      password: Joi.string().required().max(255),
    });
    try {
      const result = await schema.validateAsync(unknown);
      return result;
    } catch (error) {
      throw new ValidationError('All fields must be filled');
    }
  },
  async validateUserByEmail(email: string) {
    const userModel = await usersModel.findOne({
      where: { email },
    });
    if (!userModel) {
      throw new UnauthorizedError('Incorrect email or password');
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
      throw new UnauthorizedError('Token must be a valid token');
    }
  },
  async validateAuthorization(unknown: string | undefined) {
    const schema = Joi.string().required();
    try {
      const result = await schema.validateAsync(unknown);
      return result;
    } catch (error) {
      throw new UnauthorizedError('Token not found');
    }
  },
};

export default loginService;
